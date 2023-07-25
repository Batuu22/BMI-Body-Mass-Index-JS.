
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VKI Hesaplama (BMI)
// V.K.I (LocalStorage); acronym
// Vucüt Kitle Index (VKI) 
// Kullanıcıdan alınan Kilo ve Boy verileri formda inputtan aldıktan sonra
// Formül: Kilo/((Boy)/100)^2
// eğer bu formülde;
// 18>X     çıkarsa: Düşük Kilolu (Doktora gidiniz)
// 18<=X<24 çıkarsa: Normal Kilolu
// 24<=X<29 çıkarsa: Fazla Kilolu
// 29<=X<32 çıkarsa: Obez Kilolu
// X>=32    çıkarsa: Aşırı Obez Kilolu (Doktora gidiniz)

// VKI Butonu olsun. bu  butona bastığımızda (modal) Form açılsın.
// input: kilo
// input: boy
// submit button
// NOT: Kilo(weight), Boy(height), formül sonucu(formulaResult) ve Sonuç(result) LocalStorage olarak saklansın.

let userVki=()=>{
    $(document).ready(function(){
        //Event
        $("#vkiHesapla_id").click(function(event){
            
            event.preventDefault();

            //Kilo(Weight)
            let weight=$.trim($("#kiloInp_id").val());

            if(weight== ""){
                $("#validation_weight").html("Kilo boş geçilemez");
            }
            else if($.isNumeric(weight)==false){
                //Kullanıcı Sayı girmezse sayı girmediniz hatasını versin (REGEX)
                $("#validation_weight").html("Sayı girmelisiniz");
            }
            else{
                // LocalStorage => // NOT: Kilo(weight), Boy(height), formül sonucu(formulaResult) ve Sonuç(result) LocalStorage olarak saklansın.
                localStorage.setItem("weight",weight);
                console.log(localStorage);
                 //localStorage'dan weight'ı aldık
                getLocalWeight=Number(localStorage.getItem("weight"));
            }

            //Boy(Height)
            let height=$.trim($("#boyInp_id").val());

            if(height==""){
                $("#validation_height").html("Boy boş geçilemez");
            }
            else if($.isNumeric(height)==false){
                 //Kullanıcı Sayı girmezse sayı girmediniz hatasını versin (REGEX)
                $("#validation_height").html("Sayi girmelisiniz");
            }
            else{
                localStorage.setItem("height",height);
                console.log(localStorage);
                //localStorage'dan height'ı aldık
                getLocalHeight=Number(localStorage.getItem("height"));
            }

            // Formula: Kilo/((Boy)/100)^2
            let vkiResult=Math.round(getLocalWeight/Math.pow((getLocalHeight/100),2));
            localStorage.setItem("vkiNumber_Result",vkiResult);
             //localStorage'dan vkiResult'ı aldık
             getLocalVkiResult=localStorage.getItem("vkiNumber_Result");
             
            // 18>X     çıkarsa: Düşük Kilolu (Doktora gidiniz)
            // 18<=X<24 çıkarsa: Normal Kilolu
            // 24<=X<29 çıkarsa: Fazla Kilolu
            // 29<=X<32 çıkarsa: Obez Kilolu
            // X>=32    çıkarsa: Aşırı Obez Kilolu (Doktora gidiniz)

            if(getLocalVkiResult<18){
                $("#alertSpan_id").html(`Düşük Kilolu (doktora gidiniz) ${getLocalVkiResult}`); // => interpolation
                localStorage.setItem("vkiResult","Düşük Kilolu");
            }
            else if(18 <= getLocalVkiResult && getLocalVkiResult < 24){
                $("#alertSpan_id").html(`Normal Kilolu ${getLocalVkiResult}`);
                localStorage.setItem("vkiResult","Normal Kilolu");
            }
            else if(24 <= getLocalVkiResult && getLocalVkiResult < 29){
                $("#alertSpan_id").html(`Fazla Kilolu ${getLocalVkiResult}`);
                localStorage.setItem("vkiResult","Fazla Kilolu");
            }
            else if(29 <= getLocalVkiResult && getLocalVkiResult < 32){
                $("#alertSpan_id").html(`Obez Kilolu ${getLocalVkiResult}`);
                localStorage.setItem("vkiResult","Obez Kilolu");
            }
            else if(getLocalVkiResult>=32){
                $("#alertSpan_id").html(`Aşırı Obez Kilolu ${getLocalVkiResult}`);
                localStorage.setItem("vkiResult","Aşırı Obez Kilolu");
            }
            else{
                $("#alertSpan_id").html(`Sen insan değilsin :)`);
                localStorage.setItem("vkiResult","Sen İnsan Değilsin");
            }

        }); // click
    }); // end documentready
}
userVki();

let cleanButton=()=>{
    $("#kiloInp_id").val("");
    $("#boyInp_id").val("");
    $("#alertSpan_id").val("");
}
cleanLocalStorage=()=>{
    let localStrDelete=window.confirm("local Storage'ı gerçekten silmek istiyormusunuz ?");
    if(localStrDelete==true){
        localStorage.clear();
    }
    else{
        alert("Silme işlemi iptal edildi.");
    }
}


    
