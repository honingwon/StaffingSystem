var saveXLSX = require('./xlsxsaver').saveXLSX;
var timeStr =new Date().getTime();
$('#file').text('file' + timeStr);

$( "#datefrom" ).datepicker();
$( "#dateto" ).datepicker();

var staffset = $('#staffset');
var wrongset = $('#wrongset');
var noset = $('#noset');
var dateset = $('#dateset');

var records = [];
records.push(getHead());

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

$('input',dateset).on('change', updatePreview);

function addRecord(yes) {
  $('#list').append(getLi(yes, getstaff().id, getwrong().id));
  records.push(getRow(yes));  
  saveXLSX('file' + timeStr, records);
}

function getHead() {
  return ['报告号','date from','date to','员工','错误类型','评价'];
}

function getRow( yes) {
  var yesStr = yes == 1 ? '满意' : '不满意';
  return [getNumber(),getfrom(),getto(),getstaff().id,getwrong().id,yesStr];
}


function getLi(yes, staff, wrong ) {
  var yesStr = yes == 1 ? '满意' : '不满意';
  var str = '报告号:' + getNumber() + '|';
  str += 'date from：' + getfrom() + '|';
  str += 'date to：' + getto() + '|';
  str += '员工：' + staff + '|';
  str += '错误类型：' + wrong + '|';
  str += '评价：' + yesStr + '|';
  return '<li>'+str+'</li>';
}

function updatePreview (){
  $('#stafftxt').text(getstaff() ? getstaff().id : '未选择');
  $('#wrongtxt').text(getwrong() ? getwrong().id : '未选择');
  $('#notxt').text(getNumber());
  $('#fromtxt').text(getfrom());
  $('#totxt').text(getto());
}

function reset (){
  $('input:checked', staffset).prop('checked',false);
  $('input:checked', wrongset).prop('checked',false);
  updatePreview();
}

function getstaff() {
  return $('input:checked',staffset)[0];
}

function getfrom() {
  return $("#datefrom").val();
}

function getto() {
  return $("#dateto").val();
}

function getNumber() {
  return $('input',noset).val();
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
    addRecord(1);
    reset();    
  } 
  e.preventDefault();
}


function no (e) {
  if (confirm('确定选择不满意?')) {
    addRecord(0);
    reset();  	
  } 
  e.preventDefault();
}
