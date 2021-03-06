var saveXLSX = require('./xlsxsaver').saveXLSX;
var readFiles = require('./xlsxreader').readFiles;
var timeStr =parseInt(new Date().getTime()/1000);
var path = './files/';

var staffset = $('#staffset');
var wrongset = $('#wrongset');
var noset = $('#noset');
var dateset = $('#dateset');

var records = [];
records.push(getHead());

$( "#datefrom" ).datepicker();
$( "#dateto" ).datepicker();
$('input',dateset).on('change', updatePreview);

readFiles(path, readFilesCallback);

function readFilesCallback(result) {
  console.log(JSON.stringify(result));
  updateAllRecordView(result);
}

function updateAllRecordView (result) {
  for (var i = 4; i >= 1; i--) {
    var item = result['staff'+i];
    if(item) {
      $('#staff'+i+'result').text(getStaffResultTxt(item));
    }
  }
}

function getStaffResultTxt(result) {
  // return JSON.stringify(result)1s
  var str = parseInt((result.yes / result.count) * 100) + '%';
  str += '('+result.yes+'/'+result.count+')';
  return str;
}

document.body.addEventListener('click', function (event) {
  if (event.target.dataset.button === 'ok') {
    if(validate()) {
      ok(event);
    }
  } else if(event.target.dataset.button === 'no') {
    if(validate()) {
      no(event);
    }
  } else if(event.target.dataset.button === 'clear') {
  	clear(event);
  }  else if(event.target.nodeName == 'INPUT' || event.target.nodeName == 'LABEL') {
    updatePreview();
  }
})

function addRecord(yes) {
  $('#list').append(getLi(yes, getstaffLabel(), getwrong().id));
  records.push(getRow(yes));  
  saveXLSX( getfilename(), records);
  readFiles(path, readFilesCallback);
}

function getHead() {
  return ['报告号','date from','date to','员工ID','错误类型','评价','员工名称'];
}

function getRow( yes) {
  var yesStr = yes == 1 ? '满意' : '不满意';
  console.log("getstaffLabel",getstaffLabel())
  return [getNumber(),getfrom(),getto(),getstaff().id,getwrong().id,yesStr, getstaffLabel()];
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
  $('#file').text(getfilename());
  // $('#stafftxt').text(getstaff() ? getstaff().id : '未选择');
  // $('#wrongtxt').text(getwrong() ? getwrong().id : '未选择');
  // $('#notxt').text(getNumber());
  // $('#fromtxt').text(getfrom());
  // $('#totxt').text(getto());
}

function getfilename() {
  var reg = /\//g;
 return 'file' + getfrom().replace(reg,'') + '-'+ getto().replace(reg,'') +'-'+timeStr;
}

function reset (){
  $('input:checked', staffset).prop('checked',false);
  $('input:checked', wrongset).prop('checked',false);
  updatePreview();
}

function getstaff() {
  return $('input:checked',staffset)[0];
}
function getstaffLabel() {
  return $('#' + getstaff().id + 'Label',staffset).html();
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
  var element = $('input:checked',wrongset)[0]
  return element ? element : {};
}

function validate() {
  var ok = getstaff() !== undefined;
  if(!ok) {
    alert('员工类型未选择');
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

function clear (e) {
  $('input:checked', staffset).prop('checked',false);
  $('input:checked', wrongset).prop('checked',false);
  $( "#datefrom" ).val('');
  $( "#dateto" ).val('');
  $('input',noset).val('');
  e.preventDefault();
}
