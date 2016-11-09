/**
 * Created by user on 2016/11/9.
 */
var x=52;
var shortA=["HX","Hx","HU","Hu","HW","Hw","IW","Iw","JP","Il"];
//文字转62位数字
/*
 * t 文本串
 * k 秘钥
 */
var e_x62_A=function(t)
{
    var textX62="";
    var sheet=[];//字典
    //初始字典
    for(var i=65;i<=122;i++)
    {
        sheet.push(String.fromCharCode(i));
        if(i==90)
            i=96;
    }
    //console.log(sheet);
    //文字转换62进制
    i=0;
    while(t.charCodeAt(i))
    {
        var r=[sheet[0],sheet[0],sheet[0]];
        var num=t.charCodeAt(i);
        var p=1;
        while(num>0) {
            r[r.length-p]=sheet[num % x];
            num = parseInt(num / x);
            p++;
        }
        //textX62+=r.join("")+",";
        textX62+=r.join("");
        //console.log(t.charAt(i),t.charCodeAt(i),r);
        i++;
    }
    //console.log(t,textX62);
    //简化字符串
    for(var i1=0;i1<shortA.length;i1++)
    {
        var re=new RegExp(shortA[i1],"g");
        textX62=textX62.replace(re,i1.toString());
    }
    //console.log("加密结果:",textX62);
    return textX62;
};
//解密
var e_x62_B=function(t)
{
    var text="";
    var sheet=[];//字典
    //初始字典
    for(var i=65;i<=122;i++)
    {
        sheet.push(String.fromCharCode(i));
        if(i==90)
            i=96;
    }
    for(var i1=0;i1<shortA.length;i1++)
    {
        var re=new RegExp(i1.toString(),"g");
        t=t.replace(re,shortA[i1]);
    }
    //字符串转文字
    i=0;
    while(i<t.length)
    {
        var n=sheet.indexOf(t[i])*x*x+sheet.indexOf(t[i+1])*x+sheet.indexOf(t[i+2]);
        //console.log(t[i],t[i+1],t[i+2],n);
        text+=String.fromCharCode(n);
        i+=3;
        //console.log(String.fromCharCode(n));
    }
    //console.log(text);
    return text;
};
/*var STR="azAZ我就是想看这是什么鬼，你呢？";
 console.log("加密：",(e_x62_A(STR)));
 console.log("原文：",STR);
 console.log("翻译：",e_x62_B(e_x62_A(STR)));*/
var onSubmit=function()
{
    //清空
    if(document.getElementById("input").value=="")
    {
        document.getElementById("content").innerHTML="";
    }
    //解密
    else if(document.getElementById("input").value.lastIndexOf("hwm=")>0)
    {
        var str2=document.getElementById("input").value.substr(document.getElementById("input").value.lastIndexOf("hwm=")+4);
        document.getElementById("content").innerHTML=e_x62_B(str2);
    }
    //加密
    else
    {
        var str1=document.getElementById("input").value;
        //alert(str1);
        document.getElementById("content").innerHTML="您的好友向您分享了一条新闻，点击查看：http://news.163.com/domestic/?hwm="+e_x62_A(str1);
    }
    document.getElementById("input").value="";
};