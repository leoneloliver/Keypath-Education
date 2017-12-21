// scripts here:
function verifyStorege(){
  if(localStorage.testDone){
    $('#first-section,#second-section,#third-section').addClass('hide');
    $('#score').removeClass('hide');
    var firstclass = 'chart_'+localStorage.sectionOne;
    $('.chart-one').addClass(firstclass);
    var secondclass = 'chart_'+localStorage.sectionTwo;
    $('.chart-two').addClass(secondclass);
    var thirdclass = 'chart_'+localStorage.sectionThree;
    $('.chart-three').addClass(thirdclass);
    
    var result1 = document.getElementsByClassName('section1');
    var result2 = document.getElementsByClassName('section2');
    var result3 = document.getElementsByClassName('section3');
    result1[0].innerHTML = localStorage.sectionOne+'%';
    result2[0].innerHTML = localStorage.sectionTwo+'%';
    result3[0].innerHTML = localStorage.sectionThree+'%';
    
    $('.bar-top__progress').addClass('bar-top__100');
   }
}
verifyStorege();
// submit
function submitAnswers() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  setTimeout(function(){
    $('.bar-top__progress').addClass('bar-top__100');
  },300);
  $('#third-section').addClass('hide');
  $('#score').removeClass('hide');
// get each answer score
  function answerScore (qName) {
    var radiosNo = document.getElementsByName(qName);

    for (var i = 0, length = radiosNo.length; i < length; i++) {
        if (radiosNo[i].checked) {
        var answerValue = Number(radiosNo[i].value);
      }
    }
    // change NaNs to zero
    if (isNaN(answerValue)) {
      answerValue = 0;
    }
    return answerValue;
  }

  // calc score with answer function
  var calcScore = (answerScore('q1') + answerScore('q2') + answerScore('q3') + answerScore('q4'));
  console.log("CalcScore: " + calcScore);

  var calcScore2 = (answerScore('q1_2') + answerScore('q2_2') + answerScore('q3_2') + answerScore('q4_2'));
  console.log("CalcScore: " + calcScore2);

  var calcScore3 = (answerScore('q1_3') + answerScore('q2_3') + answerScore('q3_3') + answerScore('q4_3'));
  console.log("CalcScore: " + calcScore3);

  // calculate "possible score" integer
  var questionCountArray = document.getElementsByClassName('first-section');
  var questionCounter = 0;
  for (var i = 0, length = questionCountArray.length; i < length; i++) {
    questionCounter++;
  }

  // calculate "possible score 2" integer
  var questionCountArray2 = document.getElementsByClassName('second-section');
  var questionCounter2 = 0;
  for (var i = 0, length = questionCountArray2.length; i < length; i++) {
    questionCounter2++;
  }

  // calculate "possible score 3" integer
  var questionCountArray3 = document.getElementsByClassName('third-section');
  var questionCounter3 = 0;
  for (var i = 0, length = questionCountArray3.length; i < length; i++) {
    questionCounter3++;
  }

	// show score as "score/possible score"
	// var showScore = "Your Score section 1: " + calcScore +"/" + questionCounter + " = " + (calcScore/questionCounter)*100 + "%" ;
	// var showScore2 = "Your Score section 2: " + calcScore2 +"/" + questionCounter2 + " = " + (calcScore2/questionCounter2)*100 + "%" ;
	// var showScore3 = "Your Score section 3: " + calcScore3 +"/" + questionCounter3 + " = " + (calcScore3/questionCounter3)*100 + "%" ;

// if 4/4, "perfect score!"
  var congrats = "";
  if (calcScore === questionCounter && calcScore2 === questionCounter2 && calcScore3 === questionCounter3) {
     congrats = "Perfect Score!";
  };
  // document.getElementById('final-score').innerHTML = showScore +' and '+ showScore2 +' and '+ showScore3;
  var firstclass = 'chart_'+(calcScore/questionCounter)*100;
  $('.chart-one').addClass(firstclass);
  var secondclass = 'chart_'+(calcScore2/questionCounter2)*100;
  $('.chart-two').addClass(secondclass);
  var thirdclass = 'chart_'+(calcScore3/questionCounter3)*100;
  $('.chart-three').addClass(thirdclass);

  var result1 = document.getElementsByClassName('section1');
  var result2 = document.getElementsByClassName('section2');
  var result3 = document.getElementsByClassName('section3');
  result1[0].innerHTML = (calcScore/questionCounter)*100+'%';
  result2[0].innerHTML = (calcScore2/questionCounter2)*100+'%';
  result3[0].innerHTML = (calcScore3/questionCounter3)*100+'%';
  
  //local storage
  localStorage.setItem("testDone", true);
  localStorage.setItem("sectionOne", (calcScore/questionCounter)*100);
  localStorage.setItem("sectionTwo", (calcScore2/questionCounter2)*100);
  localStorage.setItem("sectionThree", (calcScore3/questionCounter3)*100);
  
  document.getElementById('congrats').innerHTML = congrats;
}
  
$(document).ready(function() {
  function goTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  // sumbit button hider
	$('#submit-button').click(function() {
		$(this).addClass('hide');
	});
  
  $('#clean-data').on('click',function(){
    localStorage.removeItem("testDone");
    localStorage.removeItem("sectionOne");
    localStorage.removeItem("sectionTwo");
    localStorage.removeItem("sectionThree");
    window.location.href = window.location.href;
  });

  $('.next').on('click', function(){  
    var curretStep = $(this).attr('data-step');
    //alert(curretStep);
    if(curretStep == 'step1'){
      if($('#first-section').find('input[type=radio]:checked').length == 4){
        $('#first-section').addClass('hide');
        $('#second-section').removeClass('hide');
        goTop();
        setTimeout(function(){
          $('.bar-top__progress').addClass('bar-top__50');
        },300);
      }
    }
    if(curretStep == 'step2'){
      if($('#second-section').find('input[type=radio]:checked').length == 4){
        $('#first-section,#second-section').addClass('hide');
        $('#third-section').removeClass('hide');
        goTop();
        setTimeout(function(){
          $('.bar-top__progress').addClass('bar-top__75');
        },300);
      }
    }    
  });
  
  setTimeout(function(){ 
    $('.bar-top__progress').addClass('bar-top__10');
  },300);
  
});
