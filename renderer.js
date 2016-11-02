var saveXLSX = require('./xlsxsaver').saveXLSX;
var $ = require('./jquery');
var staffset = $('#staffset');
var wrongset = $('#wrongset');

document.body.addEventListener('click', function (event) {
  if (event.target.dataset.button === 'ok') {
    if(validate()) {
      ok(event);
    }
  } else if(event.target.dataset.button === 'no') {
    if(validate()) {
      no(event);
    }
  } else if(event.target.nodeName == 'INPUT' || event.target.nodeName == 'LABEL') {
    updatePreview();
  }


})

function updatePreview (){
  console.log('selected staff' , getstaff() ? getstaff().id : '未选择')
  console.log('selected wrong' , getwrong() ? getwrong().id : '未选择')
}

function clearChecked (){
  $('input:checked', staffset).prop('checked',false);
  $('input:checked', wrongset).prop('checked',false);
}

function getstaff() {
  return $('input:checked',staffset)[0];
}

function getwrong() {
  return $('input:checked',wrongset)[0];
}

function validate() {
  var ok = getstaff() !== undefined && getwrong() !== undefined;
  if(!ok) {
    alert('员工或错误类型未选择');
  }
  return ok;
}

function ok (e) {
  if (confirm('确定选择满意?')) {
    clearChecked();
  	console.log('yes');
  } else {
  	console.log('no');
  }
  e.preventDefault();
  
}


function no (e) {
  if (confirm('确定选择不满意?')) {
    clearChecked();
  	console.log('yes');
  } else {
  	console.log('no');
  }
  e.preventDefault();
}

