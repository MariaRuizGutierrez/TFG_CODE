const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const emailjs = require('emailjs')
var pdf = require("pdf-creator-node");
var fs = require('fs');
var pdf = require('pdfkit')
var email 	= require("emailjs/email");
var nodemailer = require('nodemailer')


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


app.get('/', function(req, res){
  res.send('principal.html');
});


app.get('/anexoContratacion', function(req, res){
  res.sendFile(path.join(__dirname,'/public/anexoContratacion.html'));
});


app.get('/solicitudContratos', function(req, res){
  res.sendFile(path.join(__dirname,'/public/solicitudContratos.html'));
});

app.get('/solicitud', function(req, res){
  res.sendFile(path.join(__dirname,'/public/solicitud.html'));
});

app.get('/terminosYCondiciones', function(req, res){
  res.sendFile(path.join(__dirname,'/public/terminosYCondiciones.html'));
});

app.get('/compromiso', function(req, res){
  res.sendFile(path.join(__dirname,'/public/compromiso.html'));
});

app.get('/relacionProvisional', function(req, res){
  res.sendFile(path.join(__dirname,'/public/relacionProvisional.html'));
});

app.get('/relacionDefinitiva', function(req, res){
  res.sendFile(path.join(__dirname,'/public/relacionDefinitiva.html'));
});

app.get('/candidatosEntrevistas', function(req, res){
  res.sendFile(path.join(__dirname,'/public/candidatosEntrevistas.html'));
});

app.get('/actaComision', function(req, res){
  res.sendFile(path.join(__dirname,'/public/actaComision.html'));
});

app.post('/visualizacion', function(request, response){
  var tempFile="./output_Anexo_Contratacion.pdf";
  fs.readFile(tempFile, function (err,data){
     response.contentType("application/pdf");
     response.send(data);
  });
});

app.post('/enviarCorreo', function(req, res){
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
 
  res.sendFile(path.join(__dirname,'/public/responsables.html'));
});





app.get('/', function(req, res){
    res.send('index.html');
  });
 

  //PDF DE ANEXO DE CONTRATACIÓN
  app.post('/anexoContratacion', function(req, res){
    console.log(req.body);

    // Aquí empieza la parte de crear el documento 
    docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
    parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
    parrf3 ="Referencia: "
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
   doc.rect(45, 210, 520, 270).stroke();
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
   doc.rect(45, 90, 520, 270).stroke();
   
   var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
   console.log("maria");
   parrf32="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf32, 70,390, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/generarPDF.html'),{datos:req.body.email});

// server.send({
//   text:    "Anexo de contratación", 
//   from:    "you <organizacionMRG@gmail.com>", 
//   to:      "someone <marruigut@alum.us.es>",
//   subject: "Nuevo anexo de contratación",
//   attachment: 
//    [
//       {data:"<html>Se adjunta el anexo de contratación enviado por:<B> "+req.body.email+"</B></html>", alternative:true},
//       {path:"output_Anexo_Contratacion.pdf", type:"application/pdf", name:"Anexo_Contratacion.pdf"}
//    ]
// }, function(err, message) { console.log(err || message); });
//     res.sendFile(path.join(__dirname,'/public/responsables.html'));
  });


// Aquí es la generar el pdf del anexo de contratación para que el usuario lo vea antes de enviar por correo 
app.get('/generarPDF', function(req, res){
  res.sendFile(path.join(__dirname,'/public/generarPDF.html'));
});

// Aquí es para que se genere el anexo de contratación pero no se envía por correo
//   app.post('/generarPDF', function(req, res){
//     console.log(req.body);
//     // Aquí empieza la parte de crear el documento 
//     docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
//     parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
//     parrf3 ="Referencia: "
//     parrf4 ="Nº de plazas ofertadas: "+req.body.plazas+" "
//     parrf5 ="ANEXO"
//     parrf6 ="Retribuciones"
//     parrf7="El coste total del contrato, importe bruto de la contratación más el importe total de las cuotas patronales y el importe de la indemnización por finalización de contrato será  de "+req.body.coste+" Euros. El sueldo bruto mensual que percibirá el contratado ascenderá a "+req.body.sueldo+" Euros*. En dicha retribución  se encuentra incluido el prorrateo o parte proporcional de las pagas extras."
//     parrf8="La dedicación será de "+req.body.horasemanales+" horas semanales. "
//     parrf9="Duración"
//     parrf10="La duración del contrato será de "+req.body.duracion+" desde el comienzo del contrato, con sujeción, a la duración del proyecto y la existencia de disponibilidad presupuestaria en el mismo**."
//     parrf11="Con posibilidad de prórroga/s siempre que no se haya superado la duración del proyecto y exista disponibilidad presupuestaria con cargo al mismo, con sujeción, en todo caso, a lo dispuesto en la normativa laboral sobre la duración máxima de los contratos por obra o servicio determinado, y con informe previo favorable de la actividad realizada por el contratado, por parte del Director/a del Proyecto de Investigación donde se realice el proyecto y del Vicerrector de Investigación. "
//     parrf12 ="*Sueldo estimado en función de la fecha de inicio de la contratación."
//     parrf13="**La duración del contrato puede variar o verse afectada en base a la fecha de finalización del proyecto."
//     parrf14="Valoración de méritos"
//     parrf15="La Comisión de Valoración será responsable de valorar los méritos y ordenar la realización de las entrevistas si lo considera necesario. Con carácter general valorarán los siguientes méritos acreditados documentalmente y relacionados con las tareas y actividades a realizar, de acuerdo con las siguientes puntuaciones: Titulaciones oficiales directamente relacionadas con las tareas a desarrollar y hasta un máximo de 3 puntos. En el caso de que una determinada titulación o titulaciones sean exigibles como requisito de participación en la convocatoria, únicamente se valorarán aquellas iguales o superiores a la exigida, con los siguientes límites máximos:"
//     parrf16="• Doctor (Hasta un máximo de 3 puntos) \n • Máster Oficial o Diploma de Estudios Avanzados con la previa titulación de Grado/Licenciatura (Hasta un máximo de 2,7 puntos) \n • Máster con la previa titulación de Grado/Licenciatura (Hasta un máximo de 2,5 puntos) \n • Máster con Diplomatura (Hasta un máximo de 2,3 puntos) \n • Licenciatura (Hasta un máximo de 2,1 punto) \n • Grado (Hasta un máximo de 1,9 puntos) \n • Diplomado Universitario (Hasta un máximo de 1,7 puntos) \n • Técnico Superior de Formación Profesional (Hasta un máximo de 1,5 puntos)"
//     parrf17="2. Formación relacionada con las tareas a desempeñar (Hasta un máximo de 2 puntos)."
//     parrf18="3. Experiencia profesional relacionada con las tareas a desarrollar (Hasta un máximo de 2,5 puntos)."
//     parrf19="4. Entrevista para evaluar la aptitud para el puesto (Hasta un máximo de 2,5 puntos)."
//     parrf20="Las comisiones de valoración quedarán facultadas para establecer si es necesaria, en función del número de participantes, la realización de la entrevista y la puntuación mínima exigible en los apartados anteriores para su realización, quedando aquellos aspirantes que no la alcancen eliminados del proceso selectivo."
//     parrf21="La convocatoria para la asistencia a entrevistas se publicará en la página web del Vicerrectorado de Investigación http://investigacion.us.es/investigacion/contratos-personal con una antelación mínima de 48 horas. Junto con la convocatoria de asistencia a las entrevistas se publicarán los criterios genéricos de valoración de las entrevistas tales como: experiencia previa, conocimientos sobre las tareas a desarrollar, aptitud ante la resolución de problemas, etc."
//     parrf22="Las comisiones de valoración establecerán el umbral mínimo de puntuación para poder ser seleccionado para el contrato."
//     parrf23="Plazo de presentación de solicitudes"
//     parrf24="5 días hábiles (10) a contar desde el día siguiente al de la publicación de la presente Convocatoria en la Web del Vicerrectorado de Investigación  http://investigacion.us.es/investigacion/contratos-personal."
//     parrf25="Contrato ofertado"
//     parrf26="INVESTIGADOR RESPONSABLE: "+req.body.responsable+""
//     parrf27="REQUISITOS ESPECÍFICOS: \n \n "+req.body.requisitos+ ""
//     parrf28="COMISIÓN DE VALORACIÓN: \n \n  "+req.body.comision+""
//     parrf29="DESTINO: \n \n "+req.body.destino+""
//     parrf30="CATEGORÍA LABORAL:"+req.body.categoria+""
//     parrf31="TAREAS A REALIZAR: \n \n "+req.body.tareas+""
    

//   const doc = new pdf;
  
//   doc.pipe(fs.createWriteStream('AnexoContratacion.pdf'));


// doc.image('public/img/MRG.png', 250, 10, {fit: [110, 110], align: 'center', valign: 'center'})

//   doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(docu, 70,125, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
    
//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf2, 70,228, {
//     // height: 100,
//     width: 465,
//     align: 'justify'

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf3, 70,248, {
//     // height: 100,
//     width: 465,
//     align: 'justify'

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf4, 70,268, {
//     // height: 100,
//     width: 465,
//     align: 'justify'

//    });


//   //  ANEXO
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf5, 70,300, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//     underline:(20, 0, {color: 'blue'})

//    });

//   //  RETRIBUCIONES
//    doc.font('CALIBRI.TTF')
//    .fontSize(12)
//    .text(parrf6, 70,330, {
//     // height: 100,
//     width: 465,
//     align: 'justify'
    

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf7, 70,355, {
//     // height: 100,
//     width: 465,
//     align: 'justify'

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf8, 70,420, {
//     // height: 100,
//     width: 465,
//     align: 'justify'

//    });

// // DURACIÓN
//    doc.font('CALIBRI.TTF')
//    .fontSize(12)
//    .text(parrf9, 70,460, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//     highlight: (20, 0, {color: 'blue'})

//    });
 
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf10, 70,485, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf11, 70,525, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf12, 70,610, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf13, 70,625, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  VALORACIÓN
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//   //  .fillColor('red')
//    .text(parrf14, 70,750, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//     stroke:19
//     // oblique:12
    

//    });


//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//   //  .fillColor('red')
//    .text(parrf15, 70,100, {
//     // height: 100,
//     width: 465,
//     align: 'justify'
//    });
   
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf16, 70,210, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  ESTO ES DESPUÉS DE LOS PUNTOS
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf17, 70,350, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf18, 70,370, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf19, 70,390, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf20, 70, 420, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf21, 70,490, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf22, 70,575, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//    });

   
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf23, 70,620, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//     stroke:(1) 
//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf24, 70,640, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//    //  Contrato ofertado
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf25, 70,900, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//     underline:(20, 0, {color: 'blue'})

//    });

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf26, 70,150, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  REQUISITOS ESPECÍFICOS
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf27, 70,190, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  COMISIÓN DE VALORACIÓN
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf28, 70,500, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  DESTINO
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf29, 70,580, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

//   //  CATEGORÍA LABORAL
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf30, 70,660, {
//     // height: 100,
//     width: 465,
//     align: 'justify',
//    });


// // TAREAS A REALIZAR
//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf31, 70,900, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

   
//    var dat= new Date(); //Obtienes la fecha
//    var dat4=dat.getFullYear();
//    var dat5=dat.getMonth() + 1;
//    var dat2= dat.getDate();
//    var dat3= dat2.toString();
//   //  console.log(dat2);
//    parrf32="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

//    doc.font('CALIBRI.TTF')
//    .fontSize(11)
//    .text(parrf32, 70,300, {
//     // height: 100,
//     width: 465,
//     align: 'justify',

//    });

// // Finalize PDF file
// doc.end();

// res.sendFile(path.join(__dirname,'/public/generarPDF.html'));
// });



// Aquí es para crear el pdf del compromiso
app.post('/compromiso', function(req, res){
  console.log(req.body);

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
   parrf3="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc2.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf3, 70,380, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

// Finalize PDF file
doc2.end();

res.sendFile(path.join(__dirname,'/public/responsables.html'));
});


//Aquí es para crear el pdf de relación provisional
app.post('/relacionProvisional', function(req, res){
  console.log(req.body);

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
 .text(parrf4, 70,268, {
  // height: 100,
  width: 465,
  align: 'justify'

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
 doc.rect(45, 325, 520, 270).stroke();

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,630, {
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
   parrf8="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,700, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/responsables.html'));
});
// server.send({
//   text:    "i hope this works", 
//   from:    "you <tatoohus@gmail.com>", 
//   to:      "someone <marikichi1996@gmail.com>",
//   subject: "testing emailjs",
//   attachment: 
//    [
//       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
//       {path:"output_Anexo_Contratacion.pdf", type:"application/pdf", name:"renamed.pdf"}
//    ]
// }, function(err, message) { console.log(err || message); });
//     res.sendFile(path.join(__dirname,'/public/responsables.html'));
//   });



//Aquí es para crear el pdf de relación definitiva
app.post('/relacionDefinitiva', function(req, res){
  console.log(req.body);

  // Aquí empieza la parte de crear el documento 
  docu  = "Convocatoria de selección para la contratación temporal de personal "+req.body.personal+" para la ejecución del "+req.body.ejecucion+" de investigación “"+req.body.nombre+", "+req.body.referencia+". En el caso de que la contratación sea financiada por un proyecto de investigación, el contrato se formalizará una vez se publique la resolución definitiva de concesión del proyecto (siendo el gasto para la contratación elegible) y la orgánica disponga de la cuantía para sufragarlo. La Universidad de Sevilla no se hará responsable de aquellas contrataciones que no lleguen a materializarse por no cumplirse los requisitos exigidos."
  parrf2 ="Convocatoria del Mes: "+req.body.mes+" y Año: "+req.body.ayo+""
  parrf3 ="Referencia: "
  parrf4 ="RELACIÓN PROVISIONAL DE ASPIRANTES ADMITIDOS Y EXCLUIDOS"
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
 .text(parrf4, 70,268, {
  // height: 100,
  width: 465,
  align: 'justify'

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
 doc.rect(45, 325, 520, 270).stroke();

 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf7, 70,630, {
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
   parrf8="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf8, 70,700, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/responsables.html'));
});
// server.send({
//   text:    "i hope this works", 
//   from:    "you <tatoohus@gmail.com>", 
//   to:      "someone <marikichi1996@gmail.com>",
//   subject: "testing emailjs",
//   attachment: 
//    [
//       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
//       {path:"output_Anexo_Contratacion.pdf", type:"application/pdf", name:"renamed.pdf"}
//    ]
// }, function(err, message) { console.log(err || message); });
//     res.sendFile(path.join(__dirname,'/public/responsables.html'));
//   });


//Aquí es para crear el pdf de convocatoria a entrevista
app.post('/candidatosEntrevistas', function(req, res){
  console.log(req.body);

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
 doc.rect(45, 315, 510, 270).stroke();
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
 doc.rect(45, 105, 510, 120).stroke();

 var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   var dat3= dat2.toString();
   parrf9="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

   doc.font('CALIBRI.TTF')
   .fontSize(11)
   .text(parrf9, 70,250, {
    // height: 100,
    width: 465,
    align: 'justify',

   });

// Finalize PDF file
doc.end();
res.sendFile(path.join(__dirname,'/public/responsables.html'));
});
// server.send({
//   text:    "i hope this works", 
//   from:    "you <tatoohus@gmail.com>", 
//   to:      "someone <marikichi1996@gmail.com>",
//   subject: "testing emailjs",
//   attachment: 
//    [
//       {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
//       {path:"output_Anexo_Contratacion.pdf", type:"application/pdf", name:"renamed.pdf"}
//    ]
// }, function(err, message) { console.log(err || message); });
//     res.sendFile(path.join(__dirname,'/public/responsables.html'));
//   });




//Aquí es para crear el pdf de solicitud Contratos 
app.post('/solicitudContratos', function(req, res){
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
  parrf12 ="Correo electrónico: "+req.body.email+""
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
.text(parrf5, 250,160, {
 width: 465,
 align: 'justify'
});

// nacionalidad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf6, 250,180, {
 width: 465,
 align: 'justify'
});

// fecha de nacimiento
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf7, 250,200, {
 width: 465,
 align: 'justify'
});

// ciudad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf8, 430,160, {
 width: 465,
 align: 'justify'
});

// codigo postal
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf9, 430,180, {
 width: 465,
 align: 'justify'
});

// provincia
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf10, 430,200, {
 width: 465,
 align: 'justify'
});

// dirección
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf11, 70,230, {
 width: 465,
 align: 'justify'
});
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 155, 465, 90).stroke();

// C0NTACTO
doc.font('CALIBRI.TTF')
 .fontSize(11)
//  .fillAndStroke("#0000","#e6a756")
 .text(docu2, 70,265, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Correo electrónico
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf12, 70,300, {
 width: 465,
 align: 'justify'
});

 // Teléfono móvil
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf13, 70,320, {
  width: 465,
  align: 'justify'
 });

 // Teléfono fijo
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf14, 70,340, {
  width: 465,
  align: 'justify'
 });

 // Titulación académida
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf15, 70,360, {
  width: 465,
  align: 'justify'
 });

// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 295, 465, 80).stroke();

// REFERENCIA DE LA PLAZA QUE SE SOLITICA
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf16, 70,395, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Convocatoria titulo
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf17, 70,430, {
 width: 465,
 align: 'justify'
});

 // titulo plaza
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf18, 70,450, {
  width: 465,
  align: 'justify'
 });

 // fecha publicacion
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf19, 70,470, {
 width: 465,
 align: 'justify'
});

 // referencia
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf20, 70,490, {
  width: 465,
  align: 'justify'
 });

// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 425, 465, 80).stroke();

// OBSERVACIONES el titulo
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf21, 70,525, {
  width: 465,
  align: 'justify',
  stroke:19,
 });

//  observaciones
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf22, 70,560, {
  width: 465,
  align: 'justify'
 });
 
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 555, 465, 100).stroke();

var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   parrf23="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

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
res.sendFile(path.join(__dirname,'/public/interesados.html'));

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
  parrf12 ="Correo electrónico: "+req.body.email+""
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
.text(parrf5, 250,160, {
 width: 465,
 align: 'justify'
});

// nacionalidad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf6, 250,180, {
 width: 465,
 align: 'justify'
});

// fecha de nacimiento
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf7, 250,200, {
 width: 465,
 align: 'justify'
});

// ciudad
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf8, 430,160, {
 width: 465,
 align: 'justify'
});

// codigo postal
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf9, 430,180, {
 width: 465,
 align: 'justify'
});

// provincia
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf10, 430,200, {
 width: 465,
 align: 'justify'
});

// dirección
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf11, 70,230, {
 width: 465,
 align: 'justify'
});
// Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 155, 465, 90).stroke();

// C0NTACTO
doc.font('CALIBRI.TTF')
 .fontSize(11)
//  .fillAndStroke("#0000","#e6a756")
 .text(docu2, 70,265, {
  width: 465,
  align: 'justify',
  stroke: 19
 });

 // Correo electrónico
doc.font('CALIBRI.TTF')
.fontSize(11)
.text(parrf12, 70,300, {
 width: 465,
 align: 'justify'
});

 // Teléfono móvil
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf13, 70,320, {
  width: 465,
  align: 'justify'
 });

 // Teléfono fijo
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf14, 70,340, {
  width: 465,
  align: 'justify'
 });

 // Titulación académida
 doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf15, 70,360, {
  width: 465,
  align: 'justify'
 });

// departamento al que se inscribiría
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf16, 70,390, {
  width: 465,
  align: 'justify',
 });

 // Para la parte derecha el primer número
// Para bajarlo o subirlo hay que tocar el segundo número
// Para la parte izquierda el tercer número
// Para hacerlo más ancho el cuadro hay que tocar el último numero
doc.rect(65, 295, 465, 130).stroke();


// OBSERVACIONES el titulo
doc.font('CALIBRI.TTF')
 .fontSize(11)
 .text(parrf21, 70,460, {
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
doc.rect(65, 490, 465, 100).stroke();

var dat= new Date(); //Obtienes la fecha
   var dat4=dat.getFullYear();
   var dat5=dat.getMonth() + 1;
   var dat2= dat.getDate();
   parrf23="En Sevilla, a "+dat2+"/"+dat5+"/"+dat4+""

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
res.sendFile(path.join(__dirname,'/public/interesados.html'));

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


// Para el puerto
app.listen(app.get('port'),app.get('host'), () => {
  console.log(`Server on port ${app.get('port')}`);
}).on("error",(e)=>{
  console.log("Server NOT READY"+e);
});