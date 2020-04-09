const url = "http://sslecal2.forexprostools.com/?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=110,17,29,25,32,6,37,36,26,5,22,39,14,48,10,35,7,43,38,4,12,72&calType=week&timeZone=12&lang=12"
fetch(url)
  .then(response => response.text())
  .then(html => {
  	const doc = new DOMParser().parseFromString(html, "text/html");
  	const rows = doc.querySelectorAll('tr');
   	let noticia = {};
   	let noticias = [];
  	let dia_semana = "";
  	rows.forEach((item,i)=>{
  		if (item.querySelector('.theDay'))
  			dia_semana = item.querySelector('.theDay').innerText;

  		if(item.querySelector('.first.left.time') && item.querySelector('.sentiment')) {
  			noticia = {
  				dia: dia_semana,
  				horario: item.querySelector('.first.left.time').innerText,
  				moeda: (item.querySelector('.flagCur').innerText).trim(),
  				impacto: item.querySelector('.sentiment').title
  			}
  			noticias.push(noticia)
  		}
  	});
  	document.getElementById('output_json').innerHTML = JSON.stringify(noticias);
  })
  .catch(error => console.log('error', error));