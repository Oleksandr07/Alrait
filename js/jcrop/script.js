/**
 * HTML5 Image uploader with Jcrop
 */

// convert bytes into friendly format
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

// выбрать полигон обрезки
function checkForm() {
    if (parseInt($('#w').val())) return true;
    $('.error').html('Пожалуйста, укажите новый размер для изображения, а затем нажмите кнопку Готово').show();
    return false;
};

// обновление
function updateInfo(e) {
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#x2').val(e.x2);
    $('#y2').val(e.y2);
    $('#w').val(e.w);
    $('#h').val(e.h);
};

// очистка инфы об обрезке
function clearInfo() {
    $('.info #w').val('');
    $('.info #h').val('');
};

function fileSelectHandler() {

    // добавить выбранный файл
    var oFile = $('#image_file')[0].files[0];

    // проверка расширения файла
    var rFilter = /^(image\/jpeg|image\/png)$/i;
    if (! rFilter.test(oFile.type)) {
        alert('Пожалуйста, выберите правильный файл изображения ( jpg, png ).');
        return;
    }

    // проверка веса файла
    if (oFile.size > 3000 * 1024) {
       alert('Вы выбрали слишком большой файл, выберите, пожалуйста меньше изображение');
        return;
    }


    var div = '#modal_avatar'; // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
    $('#overlay').fadeIn(400, //пoкaзывaем oверлэй
    function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
        $(div).css({
            'left': '50%',
            'margin-left': '-'+$(div).innerWidth()/2+'px'
        })
        if ($(div).innerHeight()>=$(window).height()) {
            $(div).css({
                'display': 'block',
                'margin-top': 0,
                'height': $(window).height(),
                'overflow-y': 'auto' ,
                'opacity': 1
            }).animate({
                top: '0'
            }, 200);  
        }
        else{
            $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                .css({
                    'display': 'block',
                    'height': 'auto',
                    'margin-top': '-'+$(div).innerHeight()/2+'px'
                }) 
                .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем       
        }
        //alert($('.avatar_img img').width())
        //$('.avatar_img img').css('max-width',$('.avatar_img').width());
        $('html,body').css('overflow','hidden');
    });   

    



    // просмотр
    var oImage = document.getElementById('preview');

    // prepare HTML5 FileReader
    var oReader = new FileReader();
        oReader.onload = function(e) {

        // e.target.result contains the DataURL which we can use as a source of the image
        oImage.src = e.target.result;
        oImage.onload = function () { // onload event handler

            $('.image_file').val(oFile.name);

            // переменные для размера изображения
            var jcrop_api, boundx, boundy;

            // уничтожить Jcrop
            if (typeof jcrop_api != 'undefined') 
                jcrop_api.destroy();

            // инициировать Jcrop
            $('#preview').Jcrop({
                bgColor: 'black',
                bgOpacity: .4, // fade opacity
                onChange: updateInfo,
                onSelect: updateInfo,
                onRelease: clearInfo
            }, function(){

                // use the Jcrop API to get the real image size
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];

                // Store the Jcrop API in the jcrop_api variable
                jcrop_api = this;
            });
            $('.modal_close, #overlay').click( function(){ // лoвим клик пo крестику или oверлэю
                $('#modal_avatar') // все мoдaльные oкнa
                 .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
                     function(){ // пoсле этoгo
                         $(this).css('display', 'none');
                         $('#overlay').fadeOut(400); // прячем пoдлoжку
                     }
                 );
                jcrop_api.destroy();
                $('html,body').css('overflow','visible');  
            });
        };
    };

    // read selected file as DataURL
    oReader.readAsDataURL(oFile);
}