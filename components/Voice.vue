<template>
  <div>
    <div id="output">{{text}}</div>
    <div id="microfono">

      <img id="" src="~/assets/img/mic.gif"  @click="start();" v-bind:style="{ border: '2px solid ' + bordercolor}">
    </div>
  </div>
</template>

<script>
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
export default {
  data: function (){
    return {
    text: "",
    bordercolor: 'black'
    }
  },
  methods: {
    start() {

      if (!('webkitSpeechRecognition' in window)) {
        //  upgrade();
      } else {
        var that = this;
        this.text = "...";
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onerror = function(event) {

          if (event.error == 'no-speech') {

            //console.log('info_no_speech');
            ignore_onend = true;
          }
          if (event.error == 'audio-capture') {

            //console.log('info_no_microphone');
            ignore_onend = true;
          }
          if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
              //console.log('info_blocked');
            } else {
              //console.log('info_denied');
            }
            ignore_onend = true;
          }
        };



        recognition.onresult = function(event) {

          this.text = event;
          var interim_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
             if (event.results[i].isFinal) {
               final_transcript = event.results[i][0].transcript;
             } else {
               interim_transcript = event.results[i][0].transcript;
             }
           }
           final_transcript = final_transcript;



        }

        recognition.onend = function() {
          that.bordercolor = 'black';
          recognizing = false;
          if (ignore_onend) {
            return;
          }
          if(final_transcript != "") {
            that.text = final_transcript.toLowerCase();
            if(document.querySelectorAll("[data-voice='"+final_transcript.toLowerCase()+"']").length > 0) {
                document.querySelectorAll("[data-voice='"+final_transcript.toLowerCase()+"']")[0].click();
            }
            setTimeout(function(){ that.text = '';  }, 1000);

          }
        }

        recognition.onstart = function() {
          recognizing = true;
          that.bordercolor = 'red';
       };
        recognition.start();
      }
    }
  }
}

</script>
<style scoped>
#output {
  width: 100%;
  text-align: center;
  bottom: 75px;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
}
#microfono {
  position:fixed;
  bottom: 15px;
  left: calc(50% - 25px);
  margin:auto;
  text-align:center;



}
#microfono img {
  border-radius: 25px;
}
#output {
  margin-bottom: 10px;
}
</style>
