const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const emailjs = require('emailjs')
var pdf = require("pdf-creator-node");
var fs = require('fs');
var pdf = require('pdfkit')
var email 	= require("emailjs/email");
var nodemailer = require('nodemailer');
var formidable = require("express-formidable");
const fileUpload = require('express-fileupload')




var server 	= email.server.connect({
   user:    "organizacionMRG@gmail.com", 
   password:"Oedanone2019", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

// nodemailer.createTransport({
//   host: "smtp.google.com",
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: "María",
//     pass: "dedanone123"
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false
//   }
// });



//Start express
const app = express();

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/",express.static(path.join(__dirname,"public")));


app.set('port', process.env.PORT || 3300);
app.set('host', process.env.YOUR_HOST || '0.0.0.0');

// app.use(formidable.bodyParser({ keepExtensions:true}));
app.use(express.json({ keepExtensions:true}));
// app.use(express.bodyParser())

app.use(fileUpload())

app.get("/public/images", function(req,res){
  res.render("app/public/new");
  });

app.get('/', function(req, res){
  res.send('principal.html');
});

app.get('/', function(req, res){
  res.send('index.html');
});

app.get('/anexoContratacion', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/anexoContratacion.html'));
});

app.get('/anexoContratacion.1', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/anexoContratacion.1.html'));
});

app.get('/solicitudContratos', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/solicitudContratos.html'));
});

app.get('/solicitud', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/solicitud.html'));
});

app.get('/terminosYCondiciones', function(req, res){
  res.sendFile(path.join(__dirname,'/public/terminosYCondiciones.html'));
});

app.get('/compromisoPRL', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/compromisoPRL.html'));
});

app.get('/compromiso', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/compromiso.html'));
});

app.get('/relacionProvisional', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/relacionProvisional.html'));
});

app.get('/relacionDefinitiva', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/relacionDefinitiva.html'));
});

app.get('/candidatosEntrevistas', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/candidatosEntrevistas.html'));
});

app.get('/actaComision', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/actaComision.html'));
});

app.get('/identificacion', function(req, res){
  res.sendFile(path.join(__dirname,'/public/identificacion.html'));
});

app.get('/contrato', function(req, res){
  res.sendFile(path.join(__dirname,'/public/Formularios/contrato.html'));
});

// Aquí es es donde el usuario visualiza y envía el anexo de contratación
app.get('/generarPDF', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDF.html'));
});

// Aquí es es donde el responsable visualiza y envia el contrato
app.get('/generarPDFCompromiso', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFContrato.html'));
});

// Aquí es es donde el usuario visualiza y envía el compromiso del ip
app.get('/generarPDFCompromiso', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCompromiso.html'));
});

// Aquí es es donde el usuario visualiza y envía el compromiso prl del ip
app.get('/generarPDFCompromisoPRL', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCompromisoPRL.html'));
});

// Aquí es es donde el usuario visualiza y envía la relacion PROVISIONAL  de aspirantes admitidos y excluidos
app.get('/generarPDFRelacionProvisional', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFRelacionProvisional.html'));
});

// Aquí es es donde el usuario visualiza y envía la relacion DEFINITIVA  de aspirantes admitidos y excluidos
app.get('/generarPDFRelacionDefinitiva', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFRelacionDefinitiva.html'));
});

// Aquí es es donde el usuario visualiza y envía la lista de los candidatos seleccionados a entrevistas
app.get('/generarPDFCandidatosEntrevistas', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCandidatosEntrevistas.html'));
});

// Aquí es es donde el usuario visualiza y envía el acta de comision
app.get('/generarPDFActaComision', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFActaComision.html'));
});

// Aquí es es donde el candidatos visualiza y envía la solicitud de contratos
app.get('/generarPDFSolicitudContratos', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFSolicitudContratos.html'));
});

// Aquí es es donde el candidatos visualiza y envía la solicitud 
app.get('/generarPDFSolicitud', function(req, res){
  res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFSolicitud.html'));
});

app.post('/identificacion', function(req, res){
console.log(req.body)
if(req.body.estado =="Interesado/a"){
  res.sendFile(path.join(__dirname,'/public/preguntasInteresados.html'));
}
if(req.body.estado =="Responsable"){
  res.sendFile(path.join(__dirname,'/public/preguntasResponsables.html'));
}
  });

app.post('/visualizacionAnexoContratacion', function(request, response){
  var tempFile="./output_Anexo_Contratacion.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoAnexoContratacion', function(req, res){
  server.send({
  text:    "Anexo de contratación", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nuevo anexo de contratación",
  attachment: 
   [
      {data:"<html>Se adjunta el anexo de contratación enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Anexo_Contratacion.pdf", type:"application/pdf", name:"Anexo_Contratacion.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
 
  // res.sendFile(path.join(__dirname,'/public/responsables.html'));
});


app.post('/visualizacionContrato', function(request, response){
  var tempFile="./output_Contrato.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoContrato', function(req, res){
  server.send({
  text:    "Contrato por obras y servicios", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nuevo Contrato por obras y servicios",
  attachment: 
   [
      {data:"<html>Se adjunta el Contrato por obras y servicios enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Contrato.pdf", type:"application/pdf", name:"Contrato.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
 
  // res.sendFile(path.join(__dirname,'/public/responsables.html'));
});


app.post('/visualizacionCompromisoIP', function(request, response){
  var tempFile="./output_Compromiso_IP.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoCompromisoIP', function(req, res){
  server.send({
  text:    "Anexo II Compromiso IP", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nuevo Anexo II Compromiso IP",
  attachment: 
   [
      {data:"<html>Se adjunta el anexo II Compromiso IP enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Compromiso_IP.pdf", type:"application/pdf", name:"AnexoII_Compromiso_IP.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
 
  // res.sendFile(path.join(__dirname,'/public/responsables.html'));
});

app.post('/visualizacionCompromisoPRLIP', function(request, response){
  var tempFile="./output_Compromiso_IP_PRL.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoCompromisoPRLIP', function(req, res){
  server.send({
  text:    "Anexo III Compromiso PRL IP", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nuevo Anexo III Compromiso PRL IP",
  attachment: 
   [
      {data:"<html>Se adjunta el anexo III Compromiso IP PRL enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Compromiso_IP_PRL.pdf", type:"application/pdf", name:"AnexoIII_Compromiso_IP_PRL.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
 
  // res.sendFile(path.join(__dirname,'/public/responsables.html'));
});


app.post('/visualizacionRelacionProvisional', function(request, response){
  var tempFile="./output_Relacion_Provisional.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoRelacionProvisional', function(req, res){
  server.send({
  text:    "Relacion provisional", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nueva Relacion Provisional",
  attachment: 
   [
      {data:"<html>Se adjunta la siguiente relacion provisional enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Relacion_Provisional.pdf", type:"application/pdf", name:"Relacion_Provisional.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
});


app.post('/visualizacionRelacionDefinitiva', function(request, response){
  var tempFile="./output_Relacion_Definitiva.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoRelacionDefinitiva', function(req, res){
  server.send({
  text:    "Relacion Definitiva", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nueva Relacion Definitiva",
  attachment: 
   [
      {data:"<html>Se adjunta la siguiente relacion definitiva enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Relacion_Definitiva.pdf", type:"application/pdf", name:"Relacion_Definitiva.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
});

app.post('/visualizacionCandidatosEntrevistas', function(request, response){
  var tempFile="./output_Candidatos_Entrevistas.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoCandidatosEntrevistas', function(req, res){
  server.send({
  text:    "Candidatos seleccionados para entrevista", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Candidatos seleccionados para entrevista",
  attachment: 
   [
      {data:"<html>Se adjunta la siguiente lista de los Candidatos seleccionados para entrevista enviado por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Candidatos_Entrevistas.pdf", type:"application/pdf", name:"Candidatos_Seleccionados_Entrevistas.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
});

app.post('/visualizacionActaComision', function(request, response){
  var tempFile="./output_Acta_Comision.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoActaComision', function(req, res){
  server.send({
  text:    "Acta de Comisión", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nueva Acta de Comisión",
  attachment: 
   [
      {data:"<html>Se adjunta la siguiente Acta de Comisión enviada por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Acta_Comision.pdf", type:"application/pdf", name:"Acta_Comision.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
});


app.post('/visualizacionSolicitudContratos', function(request, response){
  var tempFile="./output_Solicitud_Contratos.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
    });
});

app.post('/visualizacionCV', function(request, response){
  var tempFile='public/images/cv.pdf';
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoSolicitudContratos', function(req, res){
  server.send({
  text:    "Solicitud contrato", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nueva solicitud de contrato",
  attachment: 
   [
      {data:"<html>Se adjunta la siguiente solicitud de contrato enviada por:<B> "+req.body.email+"</B> con número de teléfono: <B>"+req.body.telefono+"</B>. También se adjunta el CV. </html>", alternative:true},
      {path:"output_Solicitud_Contratos.pdf", type:"application/pdf", name:"Solicitud_Contrato.pdf"},
      {path:'public/images/cv.pdf', type:"application/pdf", name:"CV_Interesado.pdf"}
   ]
} , function(err, message) { console.log(err || message); });
});




app.post('/visualizacionSolicitud', function(request, response){
  var tempFile="./output_Solicitud.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreoSolicitud', function(req, res){
  server.send({
  text:    "Modelo de instancia para la solicitud", 
  from:    "organizacionMRG <organizacionMRG@gmail.com>", 
  to:      "empleado <marruigut@alum.us.es>",
  cc:      "usted <"+req.body.email+">",
  subject: "Nuevo Modelo de instancia para la solicitud",
  attachment: 
   [
      {data:"<html>Se adjunta el siguiente Modelo de instancia para la solicitud enviada por:<B> "+req.body.email+"</B> con número de teléfono: <B> "+req.body.telefono+"</B> </html>", alternative:true},
      {path:"output_Solicitud.pdf", type:"application/pdf", name:"Solicitud.pdf"}
   ]
}, function(err, message) { console.log(err || message); });
});


app.post("/public/images", function(req,res){
  console.log(req.body.archivo);
  let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ message : 'File upload' })
    })
})
// 
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    // res.send('File uploaded to ' + uploadPath);
  
  //Generamos la referencia aleatoria 
  console.log(req.body);
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var mayus = "ABCDEFGHJKMNPQRTUVWXYZ";
  var solomayus ="";
  for (i=0; i<3; i++) solomayus +=mayus.charAt(Math.floor(Math.random()*mayus.length));
  var contraseña = "";
  for (i=0; i<10; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  var dat= new Date(); //Obtienes la fecha
  var ayo=dat.getFullYear();
  var entero = ""+solomayus+"-"+contraseña+"-"+ayo+""
  console.log(entero)

    // Aquí empieza la parte de crear el documento 
    docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
    parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
    parrf3 ="Referencia: "+entero+""
    parrf4 ="Nº de plazas ofertadas: "+req.body.plazas+" "
    parrf5 ="ANEXO"
    parrf6 ="Retribuciones"
    parrf7="El coste total del contrato, importe bruto de la contratación más el importe total de las cuotas patronales y el importe de la indemnización por finalización de contrato será  de "+req.body.coste+" Euros. El sueldo bruto mensual que percibirá el contratado ascenderá a "+req.body.sueldo+" Euros*. En dicha retribución  se encuentra incluido el prorrateo o parte proporcional de las pagas extras."
    parrf8="La dedicación será de "+req.body.horasemanales+" horas semanales. "
    parrf9="Duración"
    parrf10="La duración del contrato será de "+req.body.duracion+" desde el comienzo del contrato, con sujeción, a la duración del proyecto y la existencia de disponibilidad presupuestaria en el mismo**."
    parrf11="Con posibilidad de prórroga/s siempre que no se haya superado la duración del proyecto y exista disponibilidad presupuestaria con cargo al mismo, con sujeción, en todo caso, a lo dispuesto en la normativa laboral sobre la duración máxima de los contratos por obra o servicio determinado, y con informe previo favorable de la actividad realizada por el contratado, por parte del Director/a del Proyecto de Investigación donde se realice el proyecto y del Vicerrector de Investigación. "
    parrf12 ="*Sueldo estimado en función de la fecha de inicio de la contratación."
    parrf13="**La duración del contrato puede variar o verse afectada en base a la fecha de finalización del proyecto."
    parrf14="Valoración de méritos"
    parrf15="La Comisión de Valoración será responsable de valorar los méritos y ordenar la realización de las entrevistas si lo considera necesario. Con carácter general valorarán los siguientes méritos acreditados documentalmente y relacionados con las tareas y actividades a realizar, de acuerdo con las siguientes puntuaciones: Titulaciones oficiales directamente relacionadas con las tareas a desarrollar y hasta un máximo de 3 puntos. En el caso de que una determinada titulación o titulaciones sean exigibles como requisito de participación en la convocatoria, únicamente se valorarán aquellas iguales o superiores a la exigida, con los siguientes límites máximos:"
    parrf16="• Doctor (Hasta un máximo de 3 puntos) \n • Máster Oficial o Diploma de Estudios Avanzados con la previa titulación de Grado/Licenciatura (Hasta un máximo de 2,7 puntos) \n • Máster con la previa titulación de Grado/Licenciatura (Hasta un máximo de 2,5 puntos) \n • Máster con Diplomatura (Hasta un máximo de 2,3 puntos) \n • Licenciatura (Hasta un máximo de 2,1 punto) \n • Grado (Hasta un máximo de 1,9 puntos) \n • Diplomado Universitario (Hasta un máximo de 1,7 puntos) \n • Técnico Superior de Formación Profesional (Hasta un máximo de 1,5 puntos)"
    parrf17="2. Formación relacionada con las tareas a desempeñar (Hasta un máximo de 2 puntos)."
    parrf18="3. Experiencia profesional relacionada con las tareas a desarrollar (Hasta un máximo de 2,5 puntos)."
    parrf19="4. Entrevista para evaluar la aptitud para el puesto (Hasta un máximo de 2,5 puntos)."
    parrf20="Las comisiones de valoración quedarán facultadas para establecer si es necesaria, en función del número de participantes, la realización de la entrevista y la puntuación mínima exigible en los apartados anteriores para su realización, quedando aquellos aspirantes que no la alcancen eliminados del proceso selectivo."
    parrf21="La convocatoria para la asistencia a entrevistas se publicará en la página web del Vicerrectorado de Investigación http://investigacion.us.es/investigacion/contratos-personal con una antelación mínima de 48 horas. Junto con la convocatoria de asistencia a las entrevistas se publicarán los criterios genéricos de valoración de las entrevistas tales como: experiencia previa, conocimientos sobre las tareas a desarrollar, aptitud ante la resolución de problemas, etc."
    parrf22="Las comisiones de valoración establecerán el umbral mínimo de puntuación para poder ser seleccionado para el contrato."
    parrf23="Plazo de presentación de solicitudes"
    parrf24="5 días hábiles (10) a contar desde el día siguiente al de la publicación de la presente Convocatoria en la Web del Vicerrectorado de Investigación  http://investigacion.us.es/investigacion/contratos-personal."
    parrf25="Contrato ofertado"
    parrf26="INVESTIGADOR RESPONSABLE: "+req.body.responsable+""
    parrf27="REQUISITOS ESPECÍFICOS: \n \n "+req.body.requisitos+ ""
    parrf28="COMISIÓN DE VALORACIÓN: \n \n  "+req.body.comision+""
    parrf29="DESTINO: \n \n "+req.body.destino+""
    parrf30="CATEGORÍA LABORAL:"+req.body.categoria+""
    parrf31="TAREAS A REALIZAR: \n \n "+req.body.tareas+""
    

  const doc = new pdf;
  
  doc.pipe(fs.createWriteStream('output_Anexo_Contratacion.pdf'));

  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var contraseña = "";
  for (i=0; i<20; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  console.log(contraseña)

  // doc.image('files',  250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})
  doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(docu, 70,125, {
    // height: 100,
    width: 465,
    align: 'justify',
    
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf2, 70,228, {
    // height: 100,
    width: 465,
    align: 'justify'

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf3, 70,248, {
    // height: 100,
    width: 465,
    align: 'justify'

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf4, 70,268, {
    // height: 100,
    width: 465,
    align: 'justify'

   });


  //  ANEXO
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf5, 70,300, {
    // height: 100,
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})

   });

  //  RETRIBUCIONES
   doc.font('CALIBRI.TTF')
   .fontSize(12)
   .text(parrf6, 70,330, {
    // height: 100,
    width: 465,
    align: 'justify'
    

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf7, 70,355, {
    // height: 100,
    width: 465,
    align: 'justify'

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,420, {
    // height: 100,
    width: 465,
    align: 'justify'

   });

// DURACIÓN
   doc.font('CALIBRI.TTF')
   .fontSize(12)
   .text(parrf9, 70,460, {
    // height: 100,
    width: 465,
    align: 'justify',
    highlight: (20, 0, {color: 'blue'})

   });
 
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf10, 70,485, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf11, 70,525, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf12, 70,610, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf13, 70,625, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  //  VALORACIÓN
   doc.font('CALIBRI.TTF')
   .fontSize(11)
  //  .fillColor('red')
   .text(parrf14, 70,750, {
    // height: 100,
    width: 465,
    align: 'justify',
    stroke:19
    // oblique:12
    

   });


   doc.font('CALIBRI.TTF')
   .fontSize(11)
  //  .fillColor('red')
   .text(parrf15, 70,100, {
    // height: 100,
    width: 465,
    align: 'justify'
   });
   
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf16, 70,210, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  //  ESTO ES DESPUÉS DE LOS PUNTOS
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf17, 70,350, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf18, 70,370, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf19, 70,390, {
    // height: 100,
    width: 465,
    align: 'justify',
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf20, 70, 420, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf21, 70,490, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf22, 70,575, {
    // height: 100,
    width: 465,
    align: 'justify',
   });

   
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf23, 70,620, {
    // height: 100,
    width: 465,
    align: 'justify',
    stroke:(1) 
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf24, 70,640, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   //  Contrato ofertado
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf25, 70,900, {
    // height: 100,
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})

   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf26, 70,150, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  //  REQUISITOS ESPECÍFICOS
   doc.moveDown();
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf27, 70,190, {
    // height: 100,
    width: 465,
    align: 'justify',
   });
  //  doc.rect(45, 210, 520, 270).stroke();
  //  COMISIÓN DE VALORACIÓN
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf28, 70,500, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  //  DESTINO
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf29, 70,580, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  //  CATEGORÍA LABORAL
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf30, 70,660, {
    // height: 100,
    width: 465,
    align: 'justify',
   });


// TAREAS A REALIZAR
  doc.moveDown();
   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf31, 70,900, {
    // height: 100,
    width: 465,
    align: 'justify',
   });
  //  doc.rect(45, 90, 520, 270).stroke();
  
   
   var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
   console.log("maria");
   parrf32="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf32, 70,390, {
    // height: 100,
    width: 465,
    align: 'justify',
   });

  doc.image('public/images/firma.png', 70, 400, {fit: [110, 110], align: 'center', valign: 'center'})
  
// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDF.html'),{datos:req.body.email});
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")

  });
});

// Aquí es para crear el pdf del compromiso
app.post('/compromiso', function(req, res){
  console.log(req.body);
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }


  // Aquí empieza la parte de crear el documento 
  parrf0 ="ANEXO II"
  parrf4 ="COMPROMISO INVESTIGADOR RESPONSABLE"
  parrf1 = "Don/Doña "+req.body.responsable+" con DNI/Pasaporte/NIE: "+req.body.DNI+" como Investigador responsable de la plaza ofertada de referencia "+req.body.referencia+", perteneciente a la Convocatoria para la contratación temporal de personal "+req.body.personal+" con cargo a Proyecto de Investigación y tal y como se establece en el apartado 1 de la misma, me COMPROMETO a:"
  parrf2 ="• Que el objetivo de la convocatoria es para dar cobertura a un programa, proyecto o actuación, así como para el desarrollo de actividades concretas de carácter finalistas, no estructurales."
  parrf3 ="• Aportar en documento adjunto, memoria que justifique que la actividad a contratar se trata de una tarea específica y diferenciada del resto de las actividades investigadoras desarrolladas por la Universidad de Sevilla, que no puede realizarse con sus propios medios y que tiene una duración limitada en el tiempo. Dichas tareas están directamente derivadas de los objetivos específicos del proyecto de investigación que financia el contrato ofertado"
const doc2 = new pdf;

doc2.pipe(fs.createWriteStream('output_Compromiso_IP.pdf'));

doc2.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})


doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf0, 70,125, {
  // height: 100,
  width: 465,
  align: 'center',
  stroke:19
  
 });
 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,145, {
  // height: 100,
  width: 465,
  align: 'center',
  stroke:19
  
 });

doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf1, 70,185, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });
 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,260, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,300, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });



 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
  //  console.log(dat2);
   parrf6="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc2.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf6, 70,380, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc2.image('public/images/firma.png', 70, 400, {fit: [110, 110], align: 'center', valign: 'center'})
// Finalize PDF file
doc2.end();
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCompromiso.html'));

});
});





// Aquí es para crear el pdf del compromiso IP PRL
app.post('/compromisoPRL', function(req, res){
  console.log(req.body);
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }


  // Aquí empieza la parte de crear el documento 
  parrf0 ="ANEXO III"
  parrf1 = "Don/Doña "+req.body.responsable+""
  parrf2 ="NIF: "+req.body.nif+""
  parrf3="Departamento: "+req.body.departamento+""
  parrf4="Centro: "+req.body.centro+""
  parrf5="Como Investigador/a responsable del contrato derivado de la plaza de referencia "+req.body.referencia+" ofertada mediante la Convocatoria para la contratación temporal de personal "+req.body.personal+"  con cargo a proyectos de Investigación y en base a la Resolución Rectoral firmada el 20 de septiembre de 2017, por la que se establece el procedimiento de actuación en relación con la contratación temporal de personal investigador o técnico adscrito a proyectos, ayudas, grupos y convenios de investigación, se compromete a:"
  parrf6 ="• Proporcionar los medios materiales e infraestructuras necesarias para la realización de las tareas a realizar por el contratado/a."
  parrf7 ="• Responder del correcto desempeño de las tareas del contrato asegurando que las mismas se corresponden o ciñen exclusivamente al objeto del mismo, y que coinciden con las indicadas en la convocatoria. Estas tareas no podrán coincidir en ningún caso con las habituales de la Administración y los Servicios Universitarios cuya ejecución corresponden al personal de plantilla."
  parrf8 ="• Supervisar el periodo de prueba, en su caso."
  parrf9 ="• Cumplir las medidas preventivas que establece la “Guía preventiva para el personal contratado en proyectos de investigación de la Universidad de Sevilla”, pudiendo contactar con el Servicio de Prevención de la Universidad de Sevilla para cualquier duda o aclaración."
  parrf10 ="• Asegurar que el candidato/a que obtenga el puesto tenga información y formación sobre los riesgos de las actividades que vayan a realizar, el lugar de trabajo y conocer cómo actuar ante situaciones de emergencia. Así mismo, deberá aportar certificado médico de aptitud, en su caso."

const doc2 = new pdf;

doc2.pipe(fs.createWriteStream('output_Compromiso_IP_PRL.pdf'));

doc2.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})


doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf0, 70,125, {
  // height: 100,
  width: 465,
  align: 'center',
  stroke:19
  
 });
 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf1, 70,150, {
  // height: 100,
  width: 465,
  align: 'justify'
  
 });

doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,170, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });
 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,190, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,210, {
  // height: 100,
  width: 465,
  align: 'justify',
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf5, 70,240, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf6, 70,340, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,380, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf8, 70,450, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf9, 70,480, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc2.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf10, 70,540, {
  // height: 100,
  width: 465,
  align: 'justify'
 });



 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
  //  console.log(dat2);
   parrf11="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc2.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf11, 70,600, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc2.image('public/images/firma.png', 70, 610, {fit: [110, 110], align: 'center', valign: 'center'})
// Finalize PDF file
doc2.end();

res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCompromisoPRL.html'));


let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
});
});


//Aquí es para crear el pdf de relación provisional
app.post('/relacionProvisional', function(req, res){
  console.log(req.body);

  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }


  // Aquí empieza la parte de crear el documento 
  docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
  parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
  parrf3 ="Referencia: "
  parrf4 ="RELACIÓN PROVISIONAL DE ASPIRANTES ADMITIDOS Y EXCLUIDOS"
  parrf5 ="Lista de admitidos y excluidos"
  parrf6 =""+req.body.aspirantes+""
  parrf7 ="Contra esta Resolución se podrán formular reclamaciones dentro del plazo máximo de tres días hábiles desde el día posterior a su publicación. Una vez resueltas las reclamaciones se procederá a la publicación del listado definitivo de admitidos y excluidos."


const doc = new pdf;

doc.pipe(fs.createWriteStream('output_Relacion_Provisional.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,228, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,248, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,275, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:10

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf5, 70,300, {
  // height: 100,
  width: 465,
  align: 'justify',
  underline:(20, 0, {color: 'blue'})

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf6, 70,330, {
  // height: 100,
  width: 465,
  align: 'justify'
 });
//  doc.rect(45, 325, 520, 270).stroke();

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,710, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
  //  console.log(dat2);
   parrf8="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,130, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

  doc.image('public/images/firma.png', 70, 160, {fit: [110, 110], align: 'center', valign: 'center'})
// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFRelacionProvisional.html'));
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
}); });




//Aquí es para crear el pdf de relación definitiva
app.post('/relacionDefinitiva', function(req, res){
  console.log(req.body);

  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

  // Aquí empieza la parte de crear el documento 
  docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
  parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
  parrf3 ="Referencia: "
  parrf4 ="RELACIÓN DEFINITIVA DE ASPIRANTES ADMITIDOS Y EXCLUIDOS"
  parrf5 ="Lista de admitidos y excluidos"
  parrf6 =""+req.body.aspirantes+""
  parrf7 ="Contra esta Resolución se podrán formular reclamaciones dentro del plazo máximo de tres días hábiles desde el día posterior a su publicación. Una vez resueltas las reclamaciones se procederá a la publicación del listado definitivo de admitidos y excluidos."


const doc = new pdf;

doc.pipe(fs.createWriteStream('output_Relacion_Definitiva.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,228, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,248, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,275, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:10

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf5, 70,300, {
  // height: 100,
  width: 465,
  align: 'justify',
  underline:(20, 0, {color: 'blue'})

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf6, 70,330, {
  // height: 100,
  width: 465,
  align: 'justify'
 });
//  doc.rect(45, 325, 520, 270).stroke();

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,710, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
  //  console.log(dat2);
   parrf8="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,130, {
    // height: 100,
    width: 465,
    align: 'justify',

   });
   doc.image('public/images/firma.png', 70, 160, {fit: [110, 110], align: 'center', valign: 'center'})
// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFRelacionDefinitiva.html'));
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
}); });



//Aquí es para crear el pdf de convocatoria a entrevista
app.post('/candidatosEntrevistas', function(req, res){
  console.log(req.body);

  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

  // Aquí empieza la parte de crear el documento 
  docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
  parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
  parrf3 ="Referencia: "
  parrf4 ="CANDIDATOS SELECCIONADOS PARA ENTREVISTAS"
  parrf5 =""+req.body.seleccionados+""
  parrf6 ="Lugar Entrevistas"
  parrf7 ="Las entrecistas se realizarán en la sala "+req.body.sala+", situada en la Facultad o Centro de "+req.body.centro+""
  parrf8 ="Criterios genéricos de valoración de la Entrevista"
  parrf10=""+req.body.criterios+""
const doc = new pdf;

doc.pipe(fs.createWriteStream('output_Candidatos_Entrevistas.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,228, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,258, {
  // height: 100,
  width: 465,
  align: 'justify'

 });

//  candidatos seleccionados para entrevistas
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,288, {
  // height: 100,
  width: 465,
  align: 'center',
  stroke:19

 });
//  doc.rect(45, 315, 510, 270).stroke();
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf5, 70,330, {
  // height: 100,
  width: 465,
  align: 'justify',

 });

//  Lugar para entrevistas
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf6, 70,630, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:19
 });
 

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,650, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

//  CRITERIOS
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf8, 70,730, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:10
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf10, 70,115, {
  // height: 100,
  width: 465,
  align: 'justify'
 });
//  doc.rect(45, 105, 510, 120).stroke();

 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
   parrf9="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf9, 70,250, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

   doc.image('public/images/firma.png', 70, 270, {fit: [110, 110], align: 'center', valign: 'center'})

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFCandidatosEntrevistas.html'));
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
});});


//Aquí es para crear el pdf de acta de comision
app.post('/actaComision', function(req, res){
  console.log(req.body);
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

  // Aquí empieza la parte de crear el documento 
  docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
  parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
  parrf3 ="Referencia: "
  parrf4 ="ACTA"
  parrf5 ="La Comisión de Valoración para la Convocatoria referida anteriormente:"
  parrf6 ="• Presidente: Apellidos, Nombre. Categoría laboral"
  parrf7 ="• Vocal 1: Apellidos, Nombre. Categoría laboral"
  parrf8 ="• Vocal 2: Apellidos, Nombre. Categoría laboral"
  parrf9="se reúne el día "+req.body.dia+" a las "+req.body.hora+" horas para evaluar los méritos de los candidatos."
  parrf10="La Comisión otorga las puntuaciones que se recogen en el Anexo de este Acta y propone la contratación de:"
  parrf11="APELLIDOS, NOMBRE"
  parrf12=""+req.body.gente+""
  // parrf12="ANEXO"
  // parrf13="Según el Anexo de la Convocatoria, se evalúan los siguientes apartados:"


const doc = new pdf;

doc.pipe(fs.createWriteStream('output_Acta_Comision.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  // height: 100,
  width: 465,
  align: 'justify',
  
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf2, 70,220, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf3, 70,245, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf4, 70,275, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:10
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf5, 70,300, {
  // height: 100,
  width: 465,
  align: 'justify',
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf6, 70,330, {
  // height: 100,
  width: 465,
  align: 'justify'
 });


 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,355, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf8, 70,380, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf9, 70,410, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf10, 70,440, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf11, 70,480, {
  // height: 100,
  width: 465,
  align: 'justify',
  stroke:10
 });

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf12, 70,510, {
  // height: 100,
  width: 465,
  align: 'justify'
 });

// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
// doc.rect(65, 505, 465, 250).stroke();

 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();

   parrf13="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf13, 70,710, {
    // height: 100,
    width: 465,
    align: 'justify',

   });
   doc.image('public/images/firma.png', 70, 100, {fit: [110, 110], align: 'center', valign: 'center'})
// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFActaComision.html'));
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")
}); });





//Aquí es para crear el pdf de solicitud Contratos 
app.post('/solicitudContratos', function(req, res){
  console.log(req.body);

  let sampleFile;
  let cv;
  let uploadPath;
  let uploadPath2;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  cv = req.files.cv;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'
  uploadPath2 = path.join(__dirname,"public") + '/images/' + 'cv.pdf'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    cv.mv(uploadPath2, function(err) {
      if (err) {
        return res.status(500).send(err);
      }

  // Aquí empieza la parte de crear el documento 
  num1 ="1"
  docu  = "DATOS PERSONALES"
  parrf2 ="Primer Apellido: "+req.body.primer+""
  parrf3="Segundo Apellido: "+req.body.segundo+""
  parrf4= "Nombre: "+req.body.nombre+""
  parrf5="DNI/Pasaporte/NIE: "+req.body.dni+""
  parrf6="Nacionalidad: "+req.body.nacionalidad+""
  parrf7="Fecha de nacimiento: "+req.body.nacimiento+""
  // parrf8="Ciudad: "+req.body.ciudad+""
  parrf9="Código Postal: "+req.body.codigo+""
  parrf10="Provincia: "+req.body.provincia+""
  parrf11="Dirección Postal: "+req.body.direccion+""
  docu2  = "CONTACTO"
  parrf13="Teléfono móvil: "+req.body.tlf+""
  parrf14= "Teléfono fijo: "+req.body.tlfFijo+""
  parrf15= "Titulación Académica: "+req.body.titulacion+""
  parrf16="REFERENCIA DE LA PLAZA QUE SE SOLICITA"
  parrf17="Convocatoria: "+req.body.convocatoria+""
  parrf18="Título de la plaza: "+req.body.tituloPlaza+""
  parrf19="Fecha publicación: "+req.body.fechapublicacion+""
  parrf20="Referencia: "+req.body.referenciaContratos+""
  parrf21="OBSERVACIONES"
  parrf22=""+req.body.observaciones+""


  
const doc = new pdf;


doc.pipe(fs.createWriteStream('output_Solicitud_Contratos.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})


// datos personales
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  width: 465,
  align: 'justify',
  stroke:19,
  
 });

 // primer apellido
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf2, 70,160, {
 width: 465,
 align: 'justify'
});

// segundo apellido
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf3, 70,180, {
 width: 465,
 align: 'justify'
});

// nombre
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf4, 70,200, {
 width: 465,
 align: 'justify'
});

// dni o pasaporte o nie
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf5, 70,220, {
 width: 465,
 align: 'justify'
});

// nacionalidad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf6, 70,240, {
 width: 465,
 align: 'justify'
});

// fecha de nacimiento
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf7, 70,260, {
 width: 465,
 align: 'justify'
});

// ciudad
// doc.font('CALIBRI.TTF')
// .fontSize(11)
// .text(parrf8, 400,160, {
//  width: 465,
//  align: 'justify'
// });

// codigo postal
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf9, 400,180, {
 width: 465,
 align: 'justify'
});

// provincia
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf10, 400,200, {
 width: 465,
 align: 'justify'
});

// dirección
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf11, 70,280, {
 width: 465,
 align: 'justify'
});
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 155, 470, 140).stroke();

// C0NTACTO
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu2, 70,315, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Teléfono móvil
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf13, 70,345, {
  width: 465,
  align: 'justify'
 });

 // Teléfono fijo
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf14, 70,365, {
  width: 465,
  align: 'justify'
 });

 // Titulación académida
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf15, 70,385, {
  width: 465,
  align: 'justify'
 });

// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 340, 470, 60).stroke();

// REFERENCIA DE LA PLAZA QUE SE SOLITICA
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf16, 70,420, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Convocatoria titulo
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf17, 70,455, {
 width: 465,
 align: 'justify'
});

 // titulo plaza
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf18, 70,475, {
  width: 465,
  align: 'justify'
 });

 // fecha publicacion
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf19, 70,495, {
 width: 465,
 align: 'justify'
});

 // referencia
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf20, 70,515, {
  width: 465,
  align: 'justify'
 });

// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 450, 470, 80).stroke();

// OBSERVACIONES el titulo
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf21, 70,550, {
  width: 465,
  align: 'justify',
  stroke:19,
 });

//  observaciones
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf22, 70,585, {
  width: 465,
  align: 'justify'
 });

 
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
// doc.rect(65, 580, 470, 100).stroke();

var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   parrf23="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf23, 70,710, {
    // height: 100,
    width: 465,
    align: 'justify',
   });
   doc.image('public/images/firma.png', 70, 100, {fit: [110, 110], align: 'center', valign: 'center'})
// // número 1
// doc.font('CALIBRI.TTF')
//  .fontSize(11)
//  .text(num1, 10,710, {
//   align: 'center'
//  });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFSolicitudContratos.html'));
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")

let removeFile2;
removeFile2 = path.join(__dirname,"public") + '/images/' + 'cv.pdf'
console.log("borrado2")
});
});});


//Aquí es para crear el pdf de solicitud asecas
app.post('/solicitud', function(req, res){
  console.log(req.body);

  // Aquí empieza la parte de crear el documento 
  num1 ="1"
  docu  = "DATOS PERSONALES"
  parrf2 ="Primer Apellido: "+req.body.primer+""
  parrf3="Segundo Apellido: "+req.body.segundo+""
  parrf4= "Nombre: "+req.body.nombre+""
  parrf5="DNI/Pasaporte/NIE: "+req.body.dni+""
  parrf6="Nacionalidad: "+req.body.nacionalidad+""
  parrf7="Fecha de nacimiento: "+req.body.nacimiento+""
  parrf8="Ciudad: "+req.body.ciudad+""
  parrf9="Código Postal: "+req.body.codigo+""
  parrf10="Provincia: "+req.body.provincia+""
  parrf11="Dirección Postal: "+req.body.direccion+""
  docu2  = "CONTACTO"
  parrf13="Teléfono móvil: "+req.body.tlf+""
  parrf14= "Teléfono fijo: "+req.body.tlfFijo+""
  parrf15= "Área de Conocimiento por la que concurre: "+req.body.areaconocimiento+""
  parrf16= "Departamento al que se adscribiría: "+req.body.departamento+""
  parrf21="OBSERVACIONES"
  parrf22=""+req.body.observaciones+""

  
const doc = new pdf;

doc.pipe(fs.createWriteStream('output_Solicitud.pdf'));


doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})


// datos personales
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(docu, 70,125, {
  width: 465,
  align: 'justify',
  stroke:19,
  
 });

 // primer apellido
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf2, 70,160, {
 width: 465,
 align: 'justify'
});

// segundo apellido
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf3, 70,180, {
 width: 465,
 align: 'justify'
});

// nombre
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf4, 70,200, {
 width: 465,
 align: 'justify'
});

// dni o pasaporte o nie
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf5, 70,220, {
 width: 465,
 align: 'justify'
});

// nacionalidad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf6, 70,240, {
 width: 465,
 align: 'justify'
});

// fecha de nacimiento
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf7, 70,260, {
 width: 465,
 align: 'justify'
});

// ciudad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf8, 400,160, {
 width: 465,
 align: 'justify'
});

// codigo postal
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf9, 400,180, {
 width: 465,
 align: 'justify'
});

// provincia
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf10, 400,200, {
 width: 465,
 align: 'justify'
});

// dirección
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf11, 70,280, {
 width: 465,
 align: 'justify'
});
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 155, 470, 140).stroke();

// C0NTACTO
doc.font('CALIBRI.TTF')
 .fontSize(11)
//  .fillAndStroke("#0000","#e6a756")
 .text(docu2, 70,320, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Teléfono móvil
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf13, 70,355, {
  width: 465,
  align: 'justify'
 });

 // Teléfono fijo
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf14, 70,375, {
  width: 465,
  align: 'justify'
 });

 // Área de Conocimiento por la que concurre
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf15, 70,395, {
  width: 465,
  align: 'left'
 });

// departamento al que se inscribiría
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf16, 70,425, {
  width: 465,
  align: 'left',
 });

 // Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 350, 470, 100).stroke();


// OBSERVACIONES el titulo
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf21, 70,470, {
  width: 465,
  align: 'justify',
  stroke:19,
 });

//  observaciones
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf22, 70,495, {
  width: 465,
  align: 'justify'
 });
 
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
// doc.rect(65, 490, 470, 190).stroke();

var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   parrf23="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf23, 70,700, {
    // height: 100,
    width: 465,
    align: 'justify',
   });

// // número 1
// doc.font('CALIBRI.TTF')
//  .fontSize(11)
//  .text(num1, 10,710, {
//   align: 'center'
//  });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFSolicitud.html'));

// server.send({
//   text:    "Solicitud de contratos", 
//   from:    "you <organizacionMRG@gmail.com>", 
//   to:      "someone <marruigut@alum.us.es>",
//   cc:      "else <"+req.body.email+">",
//   subject: "Nueva solicitud de contratos",
//   attachment: 
//    [
//       {data:"<html>Se adjunta la solucitud de contratos enviado por:<B> "+req.body.email+"</B></html>", alternative:true},
//       {path:"output_Solicitud_Contratos.pdf", type:"application/pdf", name:"Solicitud_Contrato.pdf"}
//    ]
// }, function(err, message) { console.log(err || message); });
});


// Realizar pdf del contrato
app.post('/contrato', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  // uploadPath = path.join(__dirname,"public") + '/images/' + sampleFile.name;
  uploadPath = path.join(__dirname,"public") + '/images/' + 'firma.png'

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    // res.send('File uploaded to ' + uploadPath);
  
  //Generamos la referencia aleatoria 
  console.log(req.body);
  

    // Aquí empieza la parte de crear el documento 
    docu  = "SOLICITUD DE CONTRATACIÓN PARA LA REALIZACIÓN DE UN PROYECTO ESPECÍFICO DE INVESTIGACIÓN"
    parrf2 ="Datos del proyecto"
    parrf3 ="Investigador responsable: "+req.body.responsable+""
    parrf4 ="Referencia del proyecto: "+req.body.referencia+""
    parrf5 ="Organismo financiador: "+req.body.organismo+""
    parrf6 ="Nombre del proyecto: "+req.body.nombre+""
    parrf7 ="Datos del contratado"
    parrf8="Nombre y apellidos: "+req.body.nombreapellidos+""
    parrf9="NIF: "+req.body.dni+""
    parrf10="Titulacion: "+req.body.titulacion+""
    parrf11="Fecha de nacimiento: "+req.body.nacimiento+""
    parrf12="Domicilio: "+req.body.domicilio+""
    parrf13="Provincia: "+req.body.provincia+""
    parrf14="Teléfono móvil: "+req.body.tlf+""
    parrf15="Teléfono fijo: "+req.body.tlfFijo+""
    parrf16="Centro de trabajo: "+req.body.centro+""
    parrf17="Departamento: "+req.body.departamento+""
    parrf18 ="Datos específicos de la contratación"
    parrf19="Tiempo dedicado: "+req.body.tiempo+""
    parrf20="Horario diario: "+req.body.horario+""
    parrf21 ="Declaración de no estar afectado de incopatibilidad"
    parrf22= "El que suscribe declara que no percibe en la actualidad alguna beca o ayuda financiada con fondos públicos o privados españoles o comunitarios, así como sueldos o salarios que impliquen vinculación contractual o estatutaria, y que son ciertos los datos indicados y FIRMO la presente declaración"
    parrf23 ="Datos retributivos"
    parrf24="Entidad: "+req.body.entidad+""
    parrf25="Sucursal: "+req.body.sucursal+""
    parrf26="Código IBAN: "+req.body.iban+""
    
  const doc = new pdf;
  
  doc.pipe(fs.createWriteStream('output_Contrato.pdf'));

doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})
  doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(docu, 70,125, {
    width: 465,
    align: 'justify',
    stroke:19
   });

   doc.font('CALIBRI.TTF')
   .fontSize(13)
   .text(parrf2, 70,145, {
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf3, 70,175, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf4, 70,195, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf5, 70,215, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf6, 70,235, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(13)
   .text(parrf7, 70,265, {
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,295, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf9, 70,315, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf10, 70,335, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf11, 70,355, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf12, 70,375, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf13, 70,395, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf14, 70,415, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf15, 70,435, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf16, 70,455, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf17, 70,475, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(13)
   .text(parrf18, 70,505, {
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf19, 70,535, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf20, 70,555, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(13)
   .text(parrf21, 70,585, {
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf22, 70,615, {
    width: 465,
    align: 'justify'
   });

   doc.image('public/images/firma.png', 70, 675, {fit: [110, 110], align: 'center', valign: 'center'})

   doc.font('CALIBRI.TTF')
   .fontSize(13)
   .text(parrf23, 70,705, {
    width: 465,
    align: 'justify',
    underline:(20, 0, {color: 'blue'})
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf24, 70,110, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf25, 70,130, {
    width: 465,
    align: 'justify'
   });

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf26, 70,150, {
    width: 465,
    align: 'justify'
   });
   
  //  var dat= new Date(); //Obtienes la fecha
  //  var dat4=dat.getFullYear();
  //  var dat5=dat.getMonth() + 1;
  //  var dat2= dat.getDate();
  //  var dat3= dat2.toString();
  //  console.log("maria");
  //  parrf32="Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""


  //  doc.font('CALIBRI.TTF')
  //  .fontSize(11)
  //  .text(parrf32, 70,390, {
  //   // height: 100,
  //   width: 465,
  //   align: 'justify',
  //  });

  // doc.image('public/images/firma.png', 70, 400, {fit: [110, 110], align: 'center', valign: 'center'})
  
// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/VisualizacionYEnvio/generarPDFContrato.html'),{datos:req.body.email});
let removeFile;
removeFile = path.join(__dirname,"public") + '/images/' + 'firma.png'
console.log("borrado")

  });
});









// Para el puerto
app.listen(app.get('port'),app.get('host'), () => {
  console.log(`Server on port ${app.get('port')}`);
}).on("error",(e)=>{
  console.log("Server NOT READY"+e);
});