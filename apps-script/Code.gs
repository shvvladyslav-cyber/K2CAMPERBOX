/** K2 CamperBox Apps Script WebApp (doPost) — see README.md */ 
const CFG={SHEET_NAME:"Orders",EMAIL_SUBJECT:"K2 CamperBox — Bestellbestätigung",INVOICE_TEMPLATE_DOC_NAME:"K2_Rechnung_Template",SEND_INVOICE_PDF:true,
TELEGRAM_ENABLED:false,TELEGRAM_BOT_TOKEN:"PASTE_TELEGRAM_BOT_TOKEN",TELEGRAM_CHAT_ID:"PASTE_TELEGRAM_CHAT_ID",
ONESIGNAL_ENABLED:false,ONESIGNAL_APP_ID:"PASTE_ONESIGNAL_APP_ID",ONESIGNAL_REST_API_KEY:"PASTE_ONESIGNAL_REST_API_KEY",ONESIGNAL_TARGET_SEGMENT:"Subscribed Users"};
function doPost(e){try{const p=JSON.parse(e.postData.contents||"{}");const ss=SpreadsheetApp.getActiveSpreadsheet();
let sh=ss.getSheetByName(CFG.SHEET_NAME);if(!sh){sh=ss.insertSheet(CFG.SHEET_NAME);sh.appendRow(["ts","order_id","lang","name","email","phone","city","car","year","model","invoice","extras","total","status","source"]);} 
const orderId="K2-"+Utilities.formatDate(new Date(),Session.getScriptTimeZone(),"yyyyMMdd-HHmmss")+"-"+Math.floor(Math.random()*1000);
const extras=(p.extras||[]).join(",");sh.appendRow([p.ts||new Date().toISOString(),orderId,p.lang||"de",p.name||"",p.email||"",p.phone||"",p.city||"",p.car||"",p.year||"",p.model||"",p.invoice||"no",extras,p.total||"","NEW",p.source||""]);
if(p.email){GmailApp.sendEmail(p.email,CFG.EMAIL_SUBJECT,buildEmailText_(p,orderId),{name:"K2 CamperBox"});}
if(CFG.SEND_INVOICE_PDF&&p.invoice==="yes"&&p.email){const pdf=buildInvoicePdf_(p,orderId);if(pdf){GmailApp.sendEmail(p.email,"Rechnung — "+orderId,"Vielen Dank. Rechnung im Anhang.",{attachments:[pdf],name:"K2 CamperBox"});}}
if(CFG.TELEGRAM_ENABLED){sendTelegram_("New order "+orderId+"\nModel: "+p.model+"\nCity: "+p.city+"\nTotal: "+p.total+"€\nInvoice: "+p.invoice);}
if(CFG.ONESIGNAL_ENABLED){sendOneSignal_("New order "+orderId,"Model: "+p.model+" • "+p.total+"€");}
return json_({ok:true,order_id:orderId});}catch(err){return json_({ok:false,error:String(err)});}}
function doGet(){return ContentService.createTextOutput("K2 WebApp is running.").setMimeType(ContentService.MimeType.TEXT);}
function buildEmailText_(p,orderId){const extras=(p.extras||[]).join(", ");return ["Vielen Dank für Ihre Bestellung!","","Order: "+orderId,"Modell: "+(p.model||""),"Extras: "+(extras||"-"),"Total (Info): "+(p.total||"-")+" EUR","","Zahlung: Bitte nutzen Sie die Stripe Links auf der Bestellseite.","Rechnung: "+(p.invoice==="yes"?"Ja":"Nein"),"","Mit freundlichen Grüßen","K2 CamperBox"].join("\n");}
function buildInvoicePdf_(p,orderId){const files=DriveApp.getFilesByName(CFG.INVOICE_TEMPLATE_DOC_NAME);if(!files.hasNext())return null;const tmpl=files.next();const copy=tmpl.makeCopy("Invoice_"+orderId);
const doc=DocumentApp.openById(copy.getId());const body=doc.getBody();body.replaceText("{{RECHNUNG_NR}}",orderId);
body.replaceText("{{DATUM}}",Utilities.formatDate(new Date(),Session.getScriptTimeZone(),"dd.MM.yyyy"));
body.replaceText("{{MODELL}}",String(p.model||""));body.replaceText("{{BETRAG}}",String(amountForModel_(p.model)));doc.saveAndClose();
return copy.getAs(MimeType.PDF).setName("Rechnung_"+orderId+".pdf");}
function amountForModel_(m){if(m==="basic")return 329;if(m==="comfort")return 549;return 799;}
function sendTelegram_(text){const url="https://api.telegram.org/bot"+CFG.TELEGRAM_BOT_TOKEN+"/sendMessage";UrlFetchApp.fetch(url,{method:"post",payload:{chat_id:CFG.TELEGRAM_CHAT_ID,text:text},muteHttpExceptions:true});}
function sendOneSignal_(title,message){const url="https://onesignal.com/api/v1/notifications";const payload={app_id:CFG.ONESIGNAL_APP_ID,included_segments:[CFG.ONESIGNAL_TARGET_SEGMENT],headings:{en:title},contents:{en:message}};
UrlFetchApp.fetch(url,{method:"post",contentType:"application/json",headers:{Authorization:"Basic "+CFG.ONESIGNAL_REST_API_KEY},payload:JSON.stringify(payload),muteHttpExceptions:true});}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
