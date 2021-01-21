var grlleryIter = '';
$(document).ready(() =>{
  grlleryIter = $('.grllery_list, .list, .page');
  console.log(grlleryIter);
  let currentPage = $(".page_button > .number > strong").html();
  const next = $('.p_btn');
  const pre = $('.n_btn');

  $(`#${currentPage}, .${currentPage}`).removeClass('dnone'); 
  
  // 다음 버튼
  next.click(function(){
    if(currentPage == 1) return alert('첫번째 페이지 입니다.');
    
    $(`#${currentPage}, .${currentPage}`).addClass('dnone'); 
    currentPage--;

    $(".page_button > .number > strong").html(currentPage);
    $(`#${currentPage}, .${currentPage}`).removeClass('dnone'); 
    
  })
  // 이전 버튼
  pre.click(function(){
    if(currentPage > grlleryIter.length -1 ) return alert('마지막 페이지 입니다.');
    
    $(`#${currentPage}, .${currentPage}`).addClass('dnone');
    currentPage++;

    $(".page_button > .number > strong").html(currentPage);
    $(`#${currentPage}, .${currentPage}`).removeClass('dnone');
  })

});
