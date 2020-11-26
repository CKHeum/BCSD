let check= {
    'email' : "F",
    'password' : "F",
    'studentID' : "F",
    'phone' : "F"
};
let countT=0;
function check_valid_email(input_id){
    let userid=input_id.value;
    let Evalid=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; //이메일 정규표현식
    if(userid != "" && userid != undefined && Evalid.test(userid)){
     return true;
    }else{
     return false;
    }
}
function check_email(input_id){
    if(check_valid_email(input_id)){ //조건 만족
       alert('"'+input_id.value+'"'+" is valid!");
       //document.getElementById('btn_email').className='btn btn-success'
       document.getElementById('btn_email').textContent="Success"
       document.getElementById('input_id').className="form-group row text-success"
       check.email="T";
       return true;
    }
    else{               //조건 불만족
       alert("Check Again!")
        document.getElementById('btn_email').className='btn btn-dark btn-sm'
        document.getElementById('btn_email').textContent="Check"
        return false;

    }

}
function check_password(){
    let pass1=document.getElementById('inputPassword1').value;
    let pass2=document.getElementById('inputPassword2').value;
    let Pvalid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;      //문자 숫자 포함 8~16글자
    if(pass1 != pass2){             //다를경우
        alert("Password not same");
        document.getElementById('btn_password').className='btn btn-dark btn-sm'
        document.getElementById('btn_password').textContent="Check"
        document.getElementById('input_pass1').className="form-group row "
        document.getElementById('input_pass2').className="form-group row "
        check.password="F";
    }else if(pass1 =="" || pass2 ==""){     //아무것도 입력 안했을 경우
        alert("Password must be input");        
        document.getElementById('btn_password').className='btn btn-dark btn-sm'
        document.getElementById('btn_password').textContent="Check"
        document.getElementById('input_pass1').className="form-group row "
        document.getElementById('input_pass2').className="form-group row "
        check.password="F";
    }else if(!Pvalid.test(pass1)){      //조건을 만족시키지 못했을 경우
        alert("Password must be composed by 8~16 words (text+number)");
        document.getElementById('btn_password').className='btn btn-dark btn-sm'
        document.getElementById('btn_password').textContent="Check"
        document.getElementById('input_pass1').className="form-group row "
        document.getElementById('input_pass2').className="form-group row "
         check.password="F";
    }else{                      //OK
        alert("OK");
        document.getElementById('btn_password').className='btn btn-success'
        document.getElementById('btn_password').textContent="Success"
        document.getElementById('input_pass1').className="form-group row text-success"
        document.getElementById('input_pass2').className="form-group row text-success"
        check.password="T";
    }
}
function match_major(inputStudentid){   //학번으로 전공 자동 선택
    let num = inputStudentid.value;
    let str = num.substr(4,6);
    if( str== "136"){
        document.getElementById('menu_major').value='com';
        check.studentID="T";
    }
    else if( str== "120"){
        document.getElementById('menu_major').value='mecanic';
        check.studentID="T";
    }
    else if( str== "140"){
        document.getElementById('menu_major').value='meca';
        check.studentID="T";
    }
    else if( str== "161"){
        document.getElementById('menu_major').value='elec';
        check.studentID="T";
    }
    else if( str== "151"){
        document.getElementById('menu_major').value='des';
        check.studentID="T";
    }
    else if( str== "174"){
        document.getElementById('menu_major').value='ener';
        check.studentID="T";
    }
    else if( str== "172"){
        document.getElementById('menu_major').value='archi';
        check.studentID="T";
    }
    else if( str== "180"){
        document.getElementById('menu_major').value='indus';
        check.studentID="T";
    }
    else{

        check.studentID="F";
    }
   
}
function check_phone(){
    let Pvalid=/^01(?:0|1|[6-9])[.-]?(\d{3}|\d{4})[.-]?(\d{4})$/
    let phone=document.getElementById('inputPhone').value;
    if(Pvalid.test(phone)){
        document.getElementById('input_phone').className="form-group row text-success"
        check.phone="T";
    }else{
        document.getElementById('input_phone').className="form-group row text-danger"
        check.phone="F";
    }
}
function check_sign(){
for (let name in check){
    if(check[name]=="F"){
       alert(name+"란을 확인하세요!")
       break;
    }
}  
    if(check.email =="T" && check.password =="T" && check.studentID =="T" && check.phone =="T" ){
        const c=document.getElementById('check_sign_all')
        c.onsubmit='return true';
        alert("가입완료")
    }
}
Logid=document.getElementById('LogId');
//Logid.addEventListener('blur',check_email);
function recheck_password(){
    if(check.password=='T'){
    pass1=document.getElementById('inputPassword1');
    pass1.addEventListener('blur',check_password);
    pass2=document.getElementById('inputPassword2');
    pass2.addEventListener('blur',check_password);
    check.password="F";
}
}
function enter(){
    if (window.event.keyCode == 13 ) {
 
        // 엔터키가 눌렸을 때 실행할 내용
        Login();
   }
}
let count=1;
function Login(){
    if(check_valid_email(LogId)){
    sessionStorage.setItem(`Email_Session${count}`,LogId.value);
    localStorage.setItem(`Email_Session${count}`,LogId.value);
    setCookie(`Email${count}`,LogId.value,3);
    count++;
    alert("로그인");
    console.log(count);
    }
    else 
    alert("Email 형식이 잘못되었습니다");
}
function Logout(){
    alert("로그아웃")
    for(let i=1;i<=count;i++){
        delCookie(`Email${i}`);
        sessionStorage.clear();
        localStorage.clear();
        console.log(count);
    }
    count=1;
}
let setCookie=function(name,value,exp){
    let date=new Date();
    date.setDate(date.getDate()+exp);
    document.cookie=name+'='+value+';expires='+date.toUTCString();

};
let getCookie=function(name){
    let x,y;
    let value=document.cookie.split(';');
    for(let i=0;i<value.length;i++){
        x=value[i].substr(0,value[i].indexOf('='));
        y=value[i].substr(value[i].indexOf('=')+1);
        x=x.replace(/^\s+|\s+$/g,'');
        if(x==name){
            return unescape(y);
        }
    }
}
let delCookie=function(name){
    document.cookie=name+'=; expires=Thu, 01 Jan 1999 00:00:10 GMT; ';
}