var saveXLSX = require('./xlsxsaver').saveXLSX;

document.body.addEventListener('click', function (event) {
  if (event.target.dataset.button === 'ok') {
    ok(event);
  } else if(event.target.dataset.button === 'no') {
  	no(event);
  }
})

function ok (e) {
  if (confirm('确定选择满意?')) {
  	console.log('yes');
  } else {
  	console.log('no');
  }
  e.preventDefault();
}


function no (e) {
  if (confirm('确定选择不满意?')) {
  	console.log('yes');
  } else {
  	console.log('no');
  }
  e.preventDefault();
}

