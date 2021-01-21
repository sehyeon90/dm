$(function() {
    page.init();
	//moviePopup.init();
});

var page = {
    init: function() {
        //공통
        page.common();
        
        //메인페이지
        page.main();
        
        page.sub();
        
        page.audition();
        
        page.newmv();
        //스타일
        page.style();
		
    },
    common: function() {
        //헤더
        var header = $("#header");
        var scrollPrev = 0;
        var gnbScrollLimit = 200;   //스크롤시 gnb 숨기는 높이값
		var topNumber;
        function headerScroll() {
            var getScrollTop = $(window).scrollTop();
			if(header.hasClass('tpopup')){
				topNumber = 170;
			}else {
				topNumber = 70;
			}
            if(scrollPrev > getScrollTop){
				topNumber = topNumber - header.height();
			}else{
				topNumber = topNumber;
			}
			if(getScrollTop > gnbScrollLimit && scrollPrev < getScrollTop) {
				header.removeClass('scroll');
				//header.addClass('ani');
			}
			else if(scrollPrev > getScrollTop) {
				header.addClass('scroll');
				header.addClass('ani');
			}
            if(getScrollTop > topNumber) {
				header.addClass('fixed');
				
			}
			else {
				header.removeClass('fixed').removeClass('scroll');
				header.removeClass('ani');
			}

			scrollPrev = getScrollTop;
        }

		/*var header = $("#header");
        var scrollPrev = 0;
        var gnbScrollLimit = 300;   //스크롤시 gnb 숨기는 높이값
        function headerScroll() {
            var getScrollTop = $(window).scrollTop();
            if(getScrollTop > 0) {
                //header.addClass("fixed");
            }
            else {
                header.removeClass("fixed");
            }
            
            if(getScrollTop > gnbScrollLimit && scrollPrev < getScrollTop) {
                header.addClass("scroll");
				header.removeClass('fixed');
            }
            else if(scrollPrev > getScrollTop) {
                header.removeClass("scroll");
				header.addClass('fixed');
            }
			if(getScrollTop < 10){
				header.removeClass("fixed");
			}

            scrollPrev = getScrollTop;
        }*/

        //타이틀 스크롤
        var titleScrollObj = $(".title_scroll, .main_visual .text_slide_box");
        var titlePrevScroll = 0;
        var titleInterval = null;
        function titleScroll(type) {
            clearTimeout(titleInterval);
            var getTitleScroll = $(window).scrollTop();
            if(getTitleScroll != titlePrevScroll) {
                titleScrollObj.addClass("on");
            }
            else titleScrollObj.removeClass("on");
            titlePrevScroll = getTitleScroll;
            
            titleInterval = setTimeout(function() {
                titleScrollObj.removeClass("on");
            }, 100);
        }

        $(window).on("scroll", function() {
            headerScroll();
            titleScroll();
        });
        headerScroll();
        
        //검색 메뉴
        var headerSearch = $("#header .popup_search");
        var btnSearch = $("#header .btn_search").on("click", function() {
            $(this).toggleClass("active");
            if($(this).hasClass("active")) {
                if(btnMenu.hasClass("active")) {
                    btnMenu.trigger("click");
                }
                headerBtn.addClass("on");
                headerSearch.stop(true,true).fadeIn(300);
                headerSearch.find(".input_search").focus();
            }
            else {
                frmSearch.submit();
                /*
                headerBtn.removeClass("on");
                headerSearch.stop(true,true).fadeOut(300);
                */
            }
            return false;
        });
        headerSearch.find(".input_search").on("focusout", function() {
            if(!$(this).val()) {
                btnSearch.removeClass("active");
                headerBtn.removeClass("on");
                headerSearch.stop(true,true).fadeOut(300);
            }
        }).on("keypress", function(e) {
            if(e.keyCode == 13) {
                //alert($(this).val() + "검색 실행");
            }
        });

        //헤더 메뉴        
        var headerMenu = $("#header .popup_menu");
        var headerBtn = $("#header .btn_search, #header .btn_menu");
        var btnMenu = $("#header .btn_menu").on("click", function() {
            $(this).toggleClass("active");
            if($(this).hasClass("active")) {
                if(btnSearch.hasClass("active")) {
                    btnSearch.trigger("click");
                }
                headerBtn.addClass("on");
                headerMenu.stop(true,true).fadeIn(300);
            }
            else {
                headerBtn.removeClass("on");
                headerMenu.stop(true,true).fadeOut(300, function() {
                    headerMenu.find(".menu_lang").hide();
                });
            }
            return false;
        });
        
        //언어 메뉴
        headerMenu.find(".btn_lang").on("click", function() {
            headerMenu.find(".menu_lang").fadeToggle(200);
            return false;
        });
        
        //히스토리 탭메뉴
        var historyTab = $(".history_tab .btn_tab").on("click", function() {
            historyTab.removeClass("active");
            var getIdx = historyTab.index($(this).addClass("active"));
            $(".history_panel .panel_box").removeClass("active").eq(getIdx).addClass("active");
            return false;
        });
    },
    main: function() {
        if($("#main_visual").length == 0) return;
        
        $("#main_visual .obj_circle").addClass("on");
        
        //비주얼 슬라이드
        var mainVisual = $("#main_visual");
        function mainResize() {
            var getHeight = $(window).height();
            mainVisual.height(getHeight);
        }
        mainResize();
        $(window).on("resize", function() {
            mainResize();
        });
        
        //0105 슬라이드 수정(아이패드지원)
        
        var issuePrev = 0;
        var issueSlideCheck = true;
        var mainVisualThumb = mainVisual.find(".btn_thumb").on("click", function() {
            if(issueSlideCheck == false) return false;
            mainTextSlide.goToNextSlide();
            return false;
        });
        mainVisual.find(".visual_slide .slide_box").each(function(key) {
            $(this).addClass("slide_" + key);
        });
        mainVisual.find(".text_slide .slide_box").each(function(key) {
            $(this).addClass("slide_" + key);
        });
        var mainVisualSlide = mainVisual.find(".visual_slide").removeClass("load").bxSlider({
            touchEnabled:false,
            auto:false,
            pause:10000,
            speed:1600,
            pager:false,
            controls:false,
            onSlideAfter: function(slide, prev, next) {
                if(next != issuePrev) {
                    mainVisualSlide.goToSlide(issuePrev);
                }
            }
        });
        var mainTextSlide = mainVisual.find(".text_slide").removeClass("load").bxSlider({
            auto:true,
            mode:"fade",
            auto:false,
            pause:10000,
            speed:1600,
            pager:false,
            controls:false,
            onSlideBefore: function(slide,prev,next) {
                issueSlideCheck = false;
                issuePrev = next;
                mainTextSlide.stopAuto();
                if(prev != next) {
                    if(prev < next && prev + 1 == next) {
                        mainVisualSlide.goToNextSlide();
                    }
                    else if(prev > next && next + 1 == prev) {
                        mainVisualSlide.goToPrevSlide();
                    }
                    else if(next == 0) {
                        mainVisualSlide.goToNextSlide();
                    }
                    else {
                        mainVisualSlide.goToSlide(next);
                    }
                }
                
                $(".main_visual .obj_line").removeClass("slide_0 slide_1 slide_2 slide_3 slide_4").addClass("slide_" + next);
            },
            onSlideAfter: function(slide,prev,next) {
                setTimeout(function() {
                    issueSlideCheck = true;
                }, 100);
                mainTextSlide.startAuto();
            }
        });
        
        mainVisual.find(".btn_slide").on("click", function() {
            if($(this).hasClass("prev")) {
                mainVisualSlide.goToPrevSlide();
                mainTextSlide.goToPrevSlide();
            }
            else {
                mainVisualSlide.goToNextSlide();
                mainTextSlide.goToNextSlide();
            }
            return false;
        });
        // --end 0105 이슈 슬라이드 수정
        
        //이슈 슬라이드
        setTimeout(function() {
            $(".main_issue").addClass("load");
        }, 100);
        
        var issueSlideThumb = $(".main_issue .slide_thumb");
        $(".main_issue .issue_slide li").each(function(key) {
            issueSlideThumb.append('<a href="#" data-slide-index="' + key + '"></a>');
        });
        $(".main_issue .issue_slide").removeClass("load").bxSlider({
            auto:false,
            pause:5000,
            speed:500,
            controls:false,
            pagerCustom:".main_issue .slide_thumb"
        });
        
        //비디오 슬라이드
        var mainVideo = $(".main_video .video_slide").removeClass("load").bxSlider({
            mode:"fade",
            auto:false,
            pause:5000,
            speed:500,
			pager:false,
            controls:false,
            //pagerCustom:".main_video .slide_thumb",
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				$('.main_video .slide_thumb a').removeClass('active');
				$('.main_video .slide_thumb a').each(function(){
					var idx = $(this).attr('data-slide-index');
					if(idx == newIndex){
						$(this).addClass('active');
					}
				})
			}
        });

		 $(".main_video .slide_thumb").removeClass("load").bxSlider({
			maxSlides:5,
			minSlides:1,
			slideWidth: 208,
			slideMargin: 10,
			moveSlides: 1,
			pager:false,
             //pagerCustom:".main_video .slide_thumb"
			onSliderLoad:function(){
				$('.main_video .slide_thumb a').on({
					'click':function(e){
						e.preventDefault();
						//$('.main_video .slide_thumb a').removeClass('active');
						//$(this).addClass('active');
						mainVideo.goToSlide($(this).attr('data-slide-index'));
					}
				});
			}
        });
        
        var albumSlideList = $(".main_album .album_slide .slide_list");
        var albumSlideListLi = $(".main_album .album_slide .slide_list .btn_link");
        var albumCloneLen = Math.ceil(13 / albumSlideListLi.length);
        var albumSlideClone = albumSlideListLi.clone();
        for(var i=0; i<albumCloneLen; i++) {
            albumSlideList.append(albumSlideClone);
        }
        var getAlbumList = albumSlideList.find(".btn_link").slice(-6);
        albumSlideList.prepend(getAlbumList);
        
        var albumMargin = 212;
        var albumMarginLeft = 114;
        var albumMarginRight = 228;
        $(".main_album .album_slide .slide_list .btn_link").each(function(i) {
            var getAlbumLeft = i * albumMargin;
            if(i==6) getAlbumLeft += albumMarginLeft;
            else if(i>6) getAlbumLeft += albumMarginRight;
            $(this).css("left", getAlbumLeft);
        });
        
        var albumCheck = true;
        var getAlbumIdx = $(".main_album .album_slide .slide_list .btn_link").eq(6).addClass("active zoom").data("index");
        
        //앨번 슬라이드
        var mainAlbumSlide = $(".main_album .album_list").removeClass("load").bxSlider({
            mode:"fade",
            auto:false,
            pause:4000,
            speed:300,
            pager:false,
            controls:false,
            startSlide:parseInt(getAlbumIdx, 10)
        });
        
        setTimeout(function() {
            var albumSlide = $(".main_album .album_slide").addClass("load");
            
            $(".main_album .album_slide .slide_list").on("click", ".btn_link", function() {
                if($(this).hasClass("active")) {
                    return true;
                }
                else if(albumCheck == true) {
                    albumCheck = false;
                    var getActive = $(".main_album .album_slide .slide_list .btn_link.active");
                    var getIdx = getActive.index();
                    var getNext = $(this);
                    var getNextIdx = getNext.index();
                    var getMoveIdx = 0;
                    if(getNextIdx > getIdx) {
                        getMoveIdx = getNextIdx - getIdx;
                        var getMove = $(".main_album .album_slide .slide_list .btn_link").slice(0, getMoveIdx);
                        var getMoveClone = getMove.clone();
                        getMove.remove();
                        albumSlideList.append(getMoveClone);
                    }
                    else {
                        getMoveIdx = -(getIdx - getNextIdx);
                        var getMove = $(".main_album .album_slide .slide_list .btn_link").slice(getMoveIdx);
                        var getMoveClone = getMove.clone();
                        getMove.remove();
                        albumSlideList.prepend(getMoveClone);
                    }
                    
                    //텍스트 슬라이드 이동
                    mainAlbumSlide.goToSlide(getNext.data("index"));
                    
                    if(ie9 != true) {
                        getActive.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                            getActive.addClass("disable");
                            getActive[0].offsetHeight;
                            getActive.removeClass("active zoom prev");
                            getActive[0].offsetHeight;
                            getActive.removeClass("disable");
                        });
                    }
                    getActive.addClass("prev");
                    
                    getMoveClone.each(function(i) {
                        if(getMoveIdx > 0) {
                            $(this).css("left", ($(".main_album .album_slide .slide_list .btn_link").length + i) * albumMargin + albumMarginRight);
                        }
                        else {
                            $(this).css("left", (i + getMoveIdx) * albumMargin);
                        }
                    });
                    
                    setTimeout(function() {
                        $(".main_album .album_slide .slide_list .btn_link").each(function(i) {
                            var getKey = i;
                            var getAlbumLeft = getKey * albumMargin;
                            if(getKey==6) getAlbumLeft += albumMarginLeft;
                            else if(getKey>6) getAlbumLeft += albumMarginRight;
                            
                            if(getKey==4 || getKey==5 || getKey==6) {
                                $(this).stop(true,true).delay(80).animate({ left:getAlbumLeft }, 400, "easeInOutQuad", function() {
                                    if(getKey == 6) {
                                        if(ie9 == true) {
                                            getActive.removeClass("active zoom prev");
                                        }
                                        $(this).addClass("active zoom");
                                        albumCheck = true;
                                    }
                                });
                            }
                            else {
                                $(this).stop(true,true).delay(0).animate({ left:getAlbumLeft }, 500, "easeInOutQuad");
                            }
                        });
                    }, 300);
                }
                return false;
            });
        }, 10);
        
        //피드 리스트
        var feedList = $(".main_feed .feed_list");
        window.feedGrid = null;
        var tempFeed = $(".main_feed .feed_list .feed_box").clone();
        $.imgpreload($(".main_feed .feed_list .img"), function() {
            $(".main_feed .feed_list").removeClass("load");
            feedGrid = new Masonry( $(".main_feed .feed_list").get(0), {
                itemSelector: ".feed_box",
                gutter: 28,
                columnWidth: 340
            });
        });
        
        //피드 더보기
        $(".main_feed .btn_more").on("click", function() {
            var getData = tempFeed.clone();
            $.imgpreload(getData.find(".img"), function() {
                feedList.append(getData);
                feedGrid.appended(getData);
                feedGrid.layout();
            });
            return false;
        });
        
        //스크롤 이벤트
        var pageVideo = $(".main_video");
        var pageAlbum = $(".main_album");
        var pageFeed = $(".main_feed");
        var pageArray = [$(window).height(),pageVideo.offset().top,pageAlbum.offset().top,pageFeed.offset().top];
        var pageInterval = null;
        var pagePrev = 0;
        var pageDir = "dn";
        
        var scrollIssue = $(".main_issue .issue_box");
        
        var objAni01 = $("#obj_ani_01").addClass("on");
        //$(".main_issue .main_line").addClass("on");
        var objAni02 = $("#obj_ani_02");
        var objAni03 = $("#obj_ani_03");
        var objAni04 = $("#obj_ani_04");
        var objAni05 = $("#obj_ani_05");
        var mainLineIssue = $(".main_issue .main_line");
        var mainLineAlbum = $(".main_album .main_line");
        
        function mainScroll() {
            var getTop = $(window).scrollTop();
            var getHeight = $(window).height();
            var getBottom = getTop + getHeight;
            
            var getScrollTop = getTop * 0.2;
            if(getScrollTop > 130) getScrollTop = 130;
            scrollIssue.css("top", getScrollTop);
            if(getTop > pagePrev) {
                pageDir = "dn"
            }
            else {
                pageDir = "up";
            }
            pagePrev = getTop;
            
            pageArray = [getHeight,pageVideo.offset().top,pageAlbum.offset().top,pageFeed.offset().top];
            
            if(pageDir == "dn") {
                if(getBottom > pageArray[0] && getTop < pageArray[1]) {
                    if(!mainLineIssue.hasClass("on")) {
                        mainLineIssue.addClass("on");
                    }
                }
                else if(getBottom > pageArray[1]) {
                    if(mainLineIssue.hasClass("on")) {
                        mainLineIssue.removeClass("on");
                    }
                }
                
                if(getBottom > pageArray[1] && getTop < pageArray[2]) {
                    if(!objAni02.hasClass("on")) {
                        objAni02.addClass("on");
                        objAni03.addClass("on");
                    }
                }
                else if(getBottom > pageArray[2]) {
                    if(objAni02.hasClass("on")) {
                        objAni02.removeClass("on");
                        objAni03.removeClass("on");
                    }
                }
                
                if(getBottom > pageArray[2] && getTop < pageArray[3]) {
                    if(!mainLineAlbum.hasClass("on")) {
                        mainLineAlbum.addClass("on");
                        objAni04.addClass("on");
                    }
                }
                else if(getBottom > pageArray[3]) {
                    if(mainLineAlbum.hasClass("on")) {
                        mainLineAlbum.removeClass("on");
                        objAni04.removeClass("on");
                    }
                }
                
                if(getBottom > pageArray[3] - 100) {
                    if(!objAni05.hasClass("on")) {
                        objAni05.addClass("on");
                    }
                }
            }
            else if(pageDir == "up") {
                if(getTop < pageArray[1] && getBottom > pageArray[0]) {
                    if(!mainLineIssue.hasClass("on")) {
                        mainLineIssue.addClass("on");
                    }
                }
                if(getTop == 0) {
                    if(mainLineIssue.hasClass("on")) {
                        mainLineIssue.removeClass("on");
                    }
                }
                
                if(getTop < pageArray[2] && getBottom > pageArray[1]) {
                    if(!objAni02.hasClass("on")) {
                        objAni02.addClass("on");
                        objAni03.addClass("on");
                    }
                }
                else if(getTop > pageArray[1]) {
                    if(objAni02.hasClass("on")) {
                        objAni02.removeClass("on");
                        objAni03.removeClass("on");
                    }
                }
                
                if(getTop < pageArray[3] && getBottom > pageArray[2]) {
                    if(!mainLineAlbum.hasClass("on")) {
                        mainLineAlbum.addClass("on");
                        objAni04.addClass("on");
                    }
                }
                else if(getTop > pageArray[2]) {
                    if(mainLineAlbum.hasClass("on")) {
                        mainLineAlbum.removeClass("on");
                        objAni04.removeClass("on");
                    }
                }
                
                if(getBottom + 100 < pageArray[3]) {
                    if(objAni05.hasClass("on")) {
                        objAni05.removeClass("on");
                    }
                }
            }
        }
        
        $(window).on("scroll", function() {
            mainScroll();
        });
        mainScroll();
        
        //상단 스크롤
        var pageScroll = true;
        // var getPageHeight = $(window).height();
        // $(window).on("mousewheel", function(event) {
            // if(pageScroll == false) return false;
//             
            // var getScrollTop = $(window).scrollTop();
            // if(getScrollTop < getPageHeight) {
                // pageScroll = false;
                // if(event.deltaY < 0) {
                    // $("html,body").stop(true,true).animate({ scrollTop:getPageHeight }, 2000, "easeOutExpo", function() {
                        // pageScroll = true;
                    // });
                    // return false;
                // }
                // else {
                    // $("html,body").stop(true,true).animate({ scrollTop:0 }, 2000, "easeOutExpo", function() {
                        // pageScroll = true;
                    // });
                    // return false;
                // }
            // }
        // });
    },
    sub: function() {
        //상단 라인 원 에니메이션
        $(".obj_line").addClass("on");
        if($(".sub_visual .obj_circle").length > 0) {
            //랜덤
            var getRand = Math.floor(Math.random() * 4) + 1;
            $(".sub_visual .obj_circle").addClass("circle" + getRand);
        }
        
        /*
        var subMain = $(".sub_musician .sub_main");
        if(subMain.length > 0) {
            var pageScroll = true;
            var getScrollTop = $(window).scrollTop();
            if(getScrollTop > 379) {
                subMain.addClass("on");
            }
            $(window).on("mousewheel", function(event) {
                if(pageScroll == false) return false;
                
                getScrollTop = $(window).scrollTop();
                if(getScrollTop > 0 && getScrollTop < 380 && pageScroll == true) {
                    if(event.deltaY < 0) {
                        if(!subMain.hasClass("on")) {
                            pageScroll = false;
                            subMain.addClass("on");
                            $("html,body").stop(true,true).animate({ scrollTop:380 }, 1500, "easeOutExpo", function() {
                                pageScroll = true;
                            });
                        }
                        return false;
                    }
                    if(event.deltaY > 0) {
                        if(subMain.hasClass("on")) {
                            pageScroll = false;
                            subMain.removeClass("on");
                            $("html,body").stop(true,true).animate({ scrollTop:0 }, 1500, "easeOutExpo", function() {
                                pageScroll = true;
                            });
                        }
                        return false;
                    }
                }
            });
        }
        */
        
        //앨범 더보기
        $(".album_text .text_box .btn_more").on("click", function() {
            $(this).parent().toggleClass("view").find(".view_more").fadeToggle(200);
            $(this).parent().find('.album_desc').toggleClass('off');
            return false;
        });

        //탭 패널 메뉴
        if($("#tab_panel").length > 0) {
            $("#tab_panel .btn_sort").on("click", function() {
                $(this).parent().find(".active").removeClass("active");
                var getIdx = $(this).addClass("active").index();
                $(".panel_area .panel_box").removeClass("active").eq(getIdx).addClass("active");
                return false;
            });
        }
    },
    audition: function() {
        var gfile_idx = 1;

        //오디션 지도
        if($("#audition_map").length > 0) {
            var getLang = $("#audition_map").data("lang").split(",");
            var mapLang = {lat:parseFloat(getLang[0]), lng:parseFloat(getLang[1])}; 
            var map = new google.maps.Map(document.getElementById("audition_map"), {
                mapTypeControl: false,
                center: mapLang,
                zoom: 17
            });
            var marker = new google.maps.Marker({
                position: mapLang,
                map: map,
                title: $("#audition_map").data("title")
            });
        }
        
        //오디션 장소 펼침 메뉴
        $(".audition_tab_list .btn_tab").on("click", function() {
            if($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active").next().stop(true,true).slideUp(200);
            }
            else {
                $(".audition_tab_list .tab.active").removeClass("active").next().stop(true,true).slideUp(200);
                $(this).parent().addClass("active").next().stop(true,true).slideDown(200);
            }
            return false;
        }).eq(0).parent().addClass("active").next().show();

        //이미지 미리보기 
        $('.file_box').on('change','.input_file',function(evt){
            if(this.files[0].size>104857600) {
                alert(_alert_lang_['audition_file_limit_capa'][sm_lang]);
                return;
            };

            var file_cnt = $('input[type="file"]').length;
            if(file_cnt>5) {
                alert(_alert_lang_['audition_file_limit_ea'][sm_lang]);
                return;
            }

            var cloned = $(this).clone();
            $('#def_file_span').html(cloned[0]);

            // var files = $(this).clone();
            var files = $.extend(true,{},$(this));

            files.attr('name', 'attach[]');
            files.attr('id', 'attach'+gfile_idx);
            files.attr('class', '');

            $('.file_list').append('<li><p>'+this.value+'</p><a href="javascript:;" class="btn_delete" data-file-idx="'+gfile_idx+'">삭제</a></li>');
            $('.file_list').append(files.hide());
            // $(this).val('');
            gfile_idx++;
        });

        $('.file_box').on('click','.btn_delete',function(evt){
            //$('.file_list').html('');
            var file_idx = $(this).data('file-idx');

            $(this).parent('li').remove();
            $('#attach'+file_idx).remove();

            $('.file_box').find('.input_file').val('');
        });

        //오디션신청
        $("#btn_apply").on("click", function() {
            var frm = $("#applyFrm");

            //필수값 체크
            if($(frm).find('select[name=audition_type]').find('option:selected').val() == '') { 
                alert(_alert_lang_['audition_audition_type'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }
            
            if($(frm).find('select[name=audition_type]').val() == 4 || $(frm).find('select[name=audition_type]').val() == 5) { 
                if($(frm).find('select[name=audition_country]').find('option:selected').val() == '') { 
                    alert(_alert_lang_['audition_audition_country'][sm_lang]);
                    $('#btn_apply').bind('click').css({'opacity':'1'});
                    return false;
                }
                
                if($(frm).find('select[name=audition_city]').find('option:selected').val() == '') { 
                    alert(_alert_lang_['audition_audition_city'][sm_lang]);
                    $('#btn_apply').bind('click').css({'opacity':'1'});
                    return false;
                }
            }

            if($(frm).find('input[name=name]').val() == '') { 
                $(frm).find('input[name=name]').focus();
                alert(_alert_lang_['audition_name'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }
            
            if($(frm).find('input[name=name]').val().length > 20) { 
                $(frm).find('input[name=name]').focus();
                alert(_alert_lang_['audition_name_length'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi.test($(frm).find('input[name=name]').val()) == true) { 
                $(frm).find('input[name=name]').focus();
                alert(_alert_lang_['audition_name_special'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if(/[0-9]/gi.test($(frm).find('input[name=name]').val()) == true) { 
                $(frm).find('input[name=name]').focus();
                alert(_alert_lang_['audition_name_not_number'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($('.age_btn .radio_area').find('.radio_box').eq(0).hasClass('active') == false && $('.age_btn .radio_area').find('.radio_box').eq(1).hasClass('active') == false) { 
                alert(_alert_lang_['audition_gender'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($(frm).find('input[name=email]').val() == '') { 
                $(frm).find('input[name=email]').focus();
                alert(_alert_lang_['audition_email'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($(frm).find('input[name=email]').val().length > 100) { 
                $(frm).find('input[name=email]').focus();
                alert(_alert_lang_['audition_email_length'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(frm).find('input[name=email]').val()) == false) { 
                alert(_alert_lang_['audition_email_format'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($(frm).find('input[name=cell]').val() == '') { 
                alert(_alert_lang_['audition_cell'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($(frm).find('input[name=cell]').val().length > 20) { 
                $(frm).find('input[name=cell]').focus();
                alert(_alert_lang_['audition_cell_length'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if(isNaN($(frm).find('input[name=cell]').val())) { 
                alert(_alert_lang_['audition_cell_number'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($(frm).find('input[type="file"]').length < 2) { 
                alert(_alert_lang_['audition_file'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($('.terms_btn .radio_area').find('.radio_box').eq(0).hasClass('active') == false) { 
                alert(_alert_lang_['audition_terms'][sm_lang]);
                $('#btn_apply').bind('click').css({'opacity':'1'});
                return false;
            }

            if($("#hidden_frame").length<1) {
                $("body").append('<iframe src="about:blank" id="hidden_frame" name="hidden_frame" width="0" height="0" frameborder="0" scrolling="no" style="display:none"></iframe>');
            }
            
            $('#btn_apply').unbind('click').css({'opacity':'.5'});

            frm.submit();
        });
    },
    newmv: function() {
        if($("#popup_mv").length > 0) {
            $(".mv_list .btn_link, .search_grid.mv .btn_search").on("click", function() {
                videoLoad(this);
                $("body").addClass("popup");
                $("#popup_mv").stop(true,true).fadeIn(300);
                return false;
            });
            $(".album_detail .track_box .list .btn_play").on("click", function() {
                var getTrackNo = $(this).data("track_no");
                var getAlbumIdx= $(this).data("album_idx");
                
                var getPopupListDefault = '<li><a href="#" data-youtube="[[video_url]]" class="btn_link"><span class="img_box bg_cover" style="background-image:url([[image_url]])"><span class="[[new_icon]]"></span><span class="play"></span></span><span class="title" title="[[album_name2]]">[[album_name]]</span><span class="name">[[star_name]]</span><span class="date">[[open_date]]</span></a></li>';
                var getPopupList='';
                $.getJSON('/album/getAlbumMvItem?track_no='+getTrackNo+'&album_idx='+getAlbumIdx, function(result) { 
                    console.log('result : '+result);
                    var getPopupListTmp='';
                    for(var i=0; i < result.total; i++) { 
                        getPopupListTmp=getPopupListDefault.replace('[[video_url]]', result.list[i].video_url);
                        getPopupListTmp=getPopupListTmp.replace('[[image_url]]', result.list[i].image_url);
                        getPopupListTmp=getPopupListTmp.replace('[[new_icon]]', result.list[i].new_icon);
                        getPopupListTmp=getPopupListTmp.replace('[[album_name]]', result.list[i].album_name);
						getPopupListTmp=getPopupListTmp.replace('[[album_name2]]', result.list[i].album_name);
                        getPopupListTmp=getPopupListTmp.replace('[[star_name]]', result.list[i].star_name);
                        getPopupListTmp=getPopupListTmp.replace('[[open_date]]', result.list[i].open_date);
                        getPopupList+=getPopupListTmp;
                    }
                    //console.log(getPopupList);
                    $("#popup_mv .video_list .mv_list").html(getPopupList);
                    $("#popup_mv .video_list .mv_list .btn_link").eq(0).trigger("click");
                    $("body").addClass("popup");
                    $("#popup_mv").stop(true,true).fadeIn(300);
                });

                return false;
            });
            
            function videoLoad(target) {
                console.log(target);
                var getYoutube = $(target).data("youtube").split("/").pop();
                var getSrc = "https://www.youtube.com/embed/" + getYoutube + "?rel=0&autoplay=1&vq=hd1080&version=3&wmode=transparent&showinfo=0&modestbranding=1";
                $("#popup_mv .video_top .video_box").html('<iframe width="100%" height="562" src="' + getSrc + '" frameborder="0" allowfullscreen></iframe>');
                if($("#main_visual").length > 0) {
                    $("#popup_mv .video_top .name").html($(target).data("name"));
                    $("#popup_mv .video_top .title").html($(target).data("title"));
                    $("#popup_mv .video_top .date").html($(target).data("date"));
                }
                else {
                    $("#popup_mv .video_top .name").html($(target).find(".name").text());
                    $("#popup_mv .video_top .title").html($(target).find(".title").text());
                    $("#popup_mv .video_top .date").html($(target).find(".date").text());
                }
                $("#popup_mv .mv_area").animate({ scrollTop:0 }, 200);

				//moviePopup.init();
            }
            
            $("#popup_mv").on("click", ".btn_link", function() {
                videoLoad(this);
                return false;
            });
            
            $("#popup_mv .btn_close").on("click", function() {
                $("#popup_mv").stop(true,true).fadeOut(300, function() {
                    $("body").removeClass("popup");
                    $("#popup_mv .video_box").empty();
                });
                return false;
            });
            
            //더보기
            $("#popup_mv").on("click", ".btn_more", function() {
                var getPopupList='';
                var popupMvList = $(getPopupList).hide();
                $("#popup_mv .video_list .mv_list").append(popupMvList);
                popupMvList.fadeIn(200);
                return false;
            });
        }
        
        //앨범 더보기
       $(".album_detail .album_text .text_box .btn_more").on("click", function() {
            $(this).parent().toggleClass("view").find(".view_more").fadeToggle(200);
			if($(this).parent().hasClass('view')) $(this).parent().removeClass('view');
            else $(this).parent().addClass('view');
			return false;
        });
    },
    newmv_bak: function() {
        if($("#popup_mv").length > 0) {
            $(".mv_list .btn_link, .search_grid.mv .btn_search, .album_detail .track_box .list .btn_play").on("click", function() {
                var getYoutube = $(this).data("youtube");
                var getSrc = makeVodCode(getYoutube); //"https://www.youtube.com/embed/" + getYoutube + "?rel=0&autoplay=1&vq=hd1080&version=3&wmode=transparent&showinfo=0&modestbranding=1";
                $("#popup_mv .video_box").html(getSrc); //'<iframe width="100%" height="562" src="' + getSrc + '" frameborder="0" allowfullscreen></iframe>');
                $("#popup_mv .title").html($(this).data("title"));
                $("#popup_mv .name").html($(this).data("name"));
                $("#popup_mv .date").html($(this).data("date"));
                $("#popup_mv").stop(true,true).fadeIn(300);
                
                // 조회수 증가 
                $.post("/mv/viewcount",{"video_idx":$(this).data("videono")});
                
                return false;
            });
            $("#popup_mv .btn_close").on("click", function() {
                $("#popup_mv").stop(true,true).fadeOut(300, function() {
                    $("#popup_mv .video_box").empty();
                });
                return false;
            });
        }
    },
    style: function() {
        $(".select_box:not(.on)").each(function() {
            var getSelect = $(this).addClass("on").wrap("<div></div>");
            getSelect.parent().attr("class", getSelect.attr("class"));
            getSelect.attr("class","select");
            var getValue = $("<a href='#' class='select_value'>" + getSelect.find("option:selected").text() + "</a>");
            getSelect.on("change", function() {
                //getValue.html(getSelect.find("option:selected").text());
                if($(this).parent().hasClass("familysite")) {
                    //location.href = getSelect.find("option:selected").val();
                    var getFamilySite = getSelect.find("option:selected").val();
                    if(getFamilySite != "") {
                        window.open(getFamilySite);
                    }
                }
            }).parent().append(getValue);
        });
        
        $(".radio_box:not(.on)").each(function() {
            $(this).addClass("on").find(".radio").on("change", function() {
                $(this).closest(".radio_area").find(".active").removeClass("active");
                if(this.checked) $(this).parent().addClass("active");
            });
            $(this).find(".radio:checked").parent().addClass("active");
        });
        
        //dropdown
        $(".dropdown_box:not(.on)").each(function() {
            $(this).addClass("on").find(".btn_dropdown").on("click", function() {
                $(this).parent().find(".select_dropdown").stop(true,true).slideToggle(200);
                return false;
            });
        });

        //audition select
        $(".audition_type_box .type_select:not(.on)").each(function() {
            var selectBox = $(this).addClass("on");
            var selectValue = $('<a href="#" class="btn_select"></a>');
            var selectOpt = [];
            var selectDefVal = "";
            $(this).find("select option").each(function() {
                var getVal = $(this).attr("value");
                if(getVal != "") {
                    if($(this).hasClass('citys') == true) selectOpt.push('<a href="#" class="btn_list citys city_' + $(this).data("class") + '" style="display:none" data-value="' + $(this).attr("value") + '">' + $(this).text() + '</a>');
                    else selectOpt.push('<a href="#" class="btn_list" data-value="' + $(this).attr("value") + '">' + $(this).text() + '</a>');
                }
            });
            var selectList = $('<div class="select_list">' + selectOpt.join("") + '</div>');
            selectValue.html($(this).find("select option:selected").text());
            $(this).append(selectValue, selectList);
            selectValue.on("click", function() {
                selectBox.toggleClass("active");
                selectList.stop(true,true).slideToggle(200);
                return false;
            });
            selectList.find(".btn_list").on("click", function() {
                selectList.find(".active").removeClass("active");
                $(this).addClass("active");
                var getVal = $(this).data("value");
                var getText = $(this).text();
                selectValue.html(getText);
                
                selectBox.removeClass("active");
                selectBox.find(".select").find('option').each(function() { 
                    $(this).attr("selected", false);
                    if(getVal == $(this).val()) $(this).attr("selected", true);
                });
                if(selectBox.find(".select").attr('name') == 'audition_type') auditionTypeChg(getVal);
                if(selectBox.find(".select").attr('name') == 'audition_country') auditionCountryChg(getVal);

                selectList.stop(true,true).slideUp(200);
                return false;
            });

            // 2019-03-05 destiny 차이나 오디션 추가 원래 css로 돌아가기
            var css_position=$('.location').css('position');
            var css_float=$('.location').css('float');
            var css_margin=$('.location').css('margin-right');
            var css_height=$('.location').css('height');

            var auditionTypeChg=function(v) { 
                // 2019-03-05 destiny 차이나 오디션 추가
                
                $('.nation .btn_select').html('Country');
                $('.location .btn_select').html('Area');
                $('.citys').hide();

                if(v == 4 || v == 5) { 
                    $('.nation, .location').show();
                    var china_idx=0;
                    $('select[name=audition_country] option').each(function() { 
                        if($(this).data('china') == 'Y') china_idx=$(this).index();
                    });
                    if(china_idx > 0) china_idx-=1;
                    if(v == 5) { 
                        $('.nation').hide();
                        $('.location').css({'position':'relative', 'float':'left', 'margin-right':'16px', 'height':'44px'});
                        $('.type_select.nation .select_list a:eq('+china_idx+')').show();
                        $('.type_select.nation .select_list a:eq('+china_idx+')').trigger('click');
                    } else { 
                        $('.type_select.nation .select_list a:eq('+china_idx+')').hide();
                        $('.location').css({'position':css_position, 'float':css_float, 'margin-right':css_margin, 'height':css_margin});
                    }
                } else { 
                    $('.nation, .location').hide();
                }
            }

            var auditionCountryChg=function(v) { 
                $('.location .btn_select').html('Area');
                $('.citys').hide();
                $('.city_'+v).show();

                $('select .citys').each(function() { 
                    $(this).attr("selected", false);
                });
            }

            var selectInterval = null;
            selectBox.hover(
                function() {
                    clearTimeout(selectInterval);
                },
                function() {
                    clearTimeout(selectInterval);
                    selectInterval = setTimeout(function() {
                        selectBox.removeClass("active");
                        selectList.stop(true,true).slideUp(200);
                    }, 300);
                }
            );
        });
    }
}

var popup = {
    show: function() {
        $.ajax({
            type: 'get',
            url: '/popup',
            data: 'conAct='+conAct,
            dataType : 'html',
            success:  function(result) { 
                $('body').prepend(result);
            }
        });
    }
}
/* 무비 팝업 */
var moviePopup = {
	init : function(){
		$('.mv_list li .title, .search_grid.mv li .title').on({
			'mouseover' : function(){
				$(this).parent().find('.mv_title_box').stop().fadeIn('fast');
			},
			'mouseleave' : function(){
				$(this).parent().find('.mv_title_box').stop().fadeOut('fast');
			}
		});
	}
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
 
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
