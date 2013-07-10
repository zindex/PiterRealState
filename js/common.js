$(function(){
    var main = new mainJS();
});

var mainJS = function(){
    var scope = this;
    $(function () {
        scope.initGallery();
        scope.initMetroMap();
        scope.initPopup();
        scope.initSidebarGallry();
        scope.initFancybox();
        scope.initToFavorites();

        scope.initFilter();
        scope.initFormReset();
    });

    this.initPopup = function(){
        $('.b-popup__close, .b-popup__bg').click(function(){
            $(this).parents('.b-popup').hide();
        });
    };
    this.initGallery = function(){
        if($('#gallery').length !== 0){

            $('#gallery').after('<div id="gallery2" class="flat__inner" />').next().html($('#gallery').html());
            $('#gallery  .flat__item :odd').remove();
            $('#gallery2 .flat__item :even').remove();

            $("#gallery").carouFredSel({
                synchronise: "#gallery2",
                scroll: 1,
                auto: false,
                prev: ".ico_type_gallery-arrow-left",
                next: ".ico_type_gallery-arrow-right",
                items: {
                    visible: 2,
                    height: "auto"
                }
            });
            $("#gallery2").carouFredSel({
                auto: false,
                items: {
                    visible: 2,
                    height: "auto"
                }
            });
        }
    };
    this.initSidebarGallry = function(){
        var gallery = $('.gallery_sb'),
        mainImg = $('.gallery__main img',gallery);

        $('.gallery__item').click(function(e){
            $(this).siblings('.gallery__item').removeClass('gallery__item_active');
            $(this).addClass('gallery__item_active');

            mainImg.attr('src',$(this).attr('data-big-image-href'));
            e.preventDefault();
        });
    };
    this.initMetroMap = function(){
      $('.metro__st').click(function(){
          $(this).toggleClass('metro__st_active');
      })
    };
    this.initFancybox = function(){
        $('.jsAddDistrict, .jsAddMetro, .jsOrderBackCall, .jsAddType, .jsShowCam, .jsMakeOrder').fancybox();
    };
    this.initFilter = function(){
        $('.filter__item .ico_type_filter-close').click(function(e){
            var itm = $(this).parents('.filter__item');
            itm.fadeOut(300,function(){
                itm.remove()
            });
            e.preventDefault();
        });

        //year area
        var isVisible;
        $('.jsShowYear').nextAll('.cover').is(':visible') ? isVisible = true : isVisible = false;

        $('.jsShowYear').parents('.cover-i').click(function(e){
            if (!isVisible){
                $('.cover',this).show();
                isVisible = true;
            }
            e.stopPropagation();
        });
        $('body').click(function(){
            if (isVisible){
                $('.jsShowYear').nextAll('.cover').hide();
                isVisible = false;
            }
        });
    };
    this.initToFavorites = function(){
        $('.jsToFavorites').click(function(){

            // when is not selected yet
            if ( !$(this).is('.b-link_red')){
                $(this).addClass('b-link_red');
                $('.ico_type_star', this).addClass('ico_type_star-red');
                $('.b-link__inner',this).text('В избраном');
            } else {
                $(this).removeClass('b-link_red');
                $('.ico_type_star-red', this).removeClass('ico_type_star-red').addClass('ico_type_star');
                $('.b-link__inner',this).text('В избранное');
            }
        });

        $('.jsDeleteFromFavorites').click(function(){
            var itm = $(this).parents('.flat__item'),
                shl = $('.flat__item-shield',itm);
            itm.addClass('flat__item_deleted');
            shl.show();
        });
        $('.jsRestoreFromFavorites').click(function(){
            var itm = $(this).parents('.flat__item'),
                shl = $('.flat__item-shield',itm);
            itm.removeClass('flat__item_deleted');
            shl.hide();
        })
    };
    this.initFormReset = function(){
        $('.jsFormReset').click(function(){
            var filter = $(this).parents('form');

            $('.filter__item',filter).remove();
            $('.b-check',filter).attr('checked',false);
            $('.metro__st',filter).removeClass('metro__st_active');

        })
    };
};


