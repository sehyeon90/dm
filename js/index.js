$(function(){
   $("#header .gnb li a").mouseenter(function(){
       $(this).css({'transform':'translate(5px,0)', 'transition':'all 0.5s'});
       $("#header .gnb li a").not(this).css({'opacity':'0.5', 'transition':'all 0.5s'});
   }).mouseleave(function(){
       $(this).css({'transform':'translate(0,0)', 'transition':'all 0.5s'});
       $("#header .gnb li a").not(this).css({'opacity':'1', 'transition':'all 0.5s'});
   });
    
   $(".sns li a").eq(0).click(function(e){
       e.preventDefault();
      $("body").toggleClass('bgon').css({'transition':'all 0.3s'});
       $(".sns li").eq(0).toggleClass('on').css({'transition':'all 0.3s'});
   });
    
   $(".sns li a").mouseenter(function(){
       $(".sns li a").not(this).css({'color':'#909090', 'transition':'all 0.5s'});
       $(".sns li a").eq(5).css({'color':'white'});
   }).mouseleave(function(){
       $(".sns li a").not(this).css({'color':'black', 'transition':'all 0.5s'});
       $(".sns li a").eq(5).css({'color':'white'});
   });
    
   $(".sns li a").eq(5).mouseenter(function(){
       $(".sns li a").not(this).css({'color':'black'});
   }).mouseleave(function(){
       $(".sns li a").not(this).css({'color':'black'});
   });
    
    $('.top').hide();
   $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.top').fadeIn(500);
            $('.gnb').fadeOut();
            $('.sns li').not('.top').fadeOut();
            $('.sns hr').fadeOut();
        } else {
            $('.top').fadeOut(500);
            $('.gnb').fadeIn();
            $('.sns li').not('.top').fadeIn();
            $('.sns hr').fadeIn();
        }
    });

    $(".top").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 300);
            return false;
    });
    
    
   var current = 0;
   var banner = $('.visual li');
    
    $(".up").click(function(e){
            e.preventDefault();
			var prev = banner.eq(current);
			move(prev, 0, '100%');
			
			current--;
			
            if(current < 0) current = banner.size()-1;
			
			var next = banner.eq(current);
			move(next, '-100%', 0);
		});
        function move(tg, start, end){
			tg.css('top', start).stop().animate({top:end}, {duration:900, ease:'easeOutCubic'});
		}
        
        $(".down").click(function(e){
            e.preventDefault();
			var prev = banner.eq(current);
			move2(prev, 0, '-100%');
			
			current++;
			
			if(current == banner.size()) current = 0;
			
			var next = banner.eq(current);
			move2(next, '100%', 0);
		});
        
		function move2(tg2, start2, end2){
			tg2.css('top', start2).stop().animate({top:end2}, {duration:900, ease:'easeOutCubic'});
		}
});