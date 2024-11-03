import React, { useEffect } from 'react';
import './ChatBot.css';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';

const ChatBot = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(document).on('click', '.iconInner', function (e) {
        $(this).parents('.botIcon').addClass('showBotSubject');
        $("[name='msg']").focus();
      });

      $(document).on('click', '.chat_close_icon', function (e) {
        $(this).parents('.botIcon').removeClass('showBotSubject');
        $(this).parents('.botIcon').removeClass('showMessenger');
      });

      $(document).on('submit', '#messenger', function (e) {
        e.preventDefault();

        var val = $("[name=msg]").val().toLowerCase();
        var mainval = $("[name=msg]").val();
        let name = '';
        const nowtime = new Date();
        const nowhoue = nowtime.getHours();

        function userMsg(msg) {
          $('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' + mainval + '</span></div>');
        };
        
        function appendMsg(msg) {
          $('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
          $("[name='msg']").val("");
        };

        userMsg(mainval);

        // Respond based on input
        if (val.indexOf("hello") > -1 || val.indexOf("hi") > -1 || val.indexOf("good morning") > -1 || val.indexOf("good afternoon") > -1 || val.indexOf("good evening") > -1 || val.indexOf("good night") > -1) {
          if (nowhoue >= 12 && nowhoue <= 16) {
            appendMsg('good afternoon');
          } else if (nowhoue >= 10 && nowhoue <= 12) {
            appendMsg('hi');
          } else if (nowhoue >= 0 && nowhoue <= 10) {
            appendMsg('good morning');
          } else {
            appendMsg('good evening');
          }

          appendMsg("what's your name?");
        } else if (val.indexOf("i have problem with") > -1) {
          if (val.indexOf("girlfriend") > -1 || val.indexOf("gf") > -1) {
            appendMsg("take out your girlfriend for dinner or a movie.");
            appendMsg("is it helpful? (yes/no)");
          } else if (val.indexOf("boyfriend") > -1 || val.indexOf("bf") > -1) {
            appendMsg("buy something for him.");
            appendMsg("is it helpful? (yes/no)");
          } else {
            appendMsg("sorry, i'm not able to get your point, please ask something else.");
          }
        } else if (val.indexOf("yes") > -1) {
          appendMsg("it's my pleasure that I can help you");
          saybye();
        } else if (val.indexOf("no") > -1) {
          appendMsg("it's my bad that I can't help you. please try later");
          saybye();
        } else if (val.indexOf("my name is ") > -1 || val.indexOf("i am ") > -1 || val.indexOf("i'm ") > -1 || val.split(" ").length < 2) {
          if (val.indexOf("my name is") > -1) {
            name = val.replace("my name is", "");
          } else if (val.indexOf("i am") > -1) {
            name = val.replace("i am", "");
          } else if (val.indexOf("i'm") > -1) {
            name = val.replace("i'm", "");
          } else {
            name = mainval;
          }

          appendMsg("hi " + name + ", how can I help you?");
        } else {
          appendMsg("sorry i'm not able to understand what you want to say");
        }

        function saybye() {
          if (nowhoue <= 10) {
            appendMsg("have a nice day! :)");
          } else if (nowhoue >= 11 && nowhoue <= 20) {
            appendMsg("bye!");
          } else {
            appendMsg("good night!");
          }
        }

        const lastMsg = $('.Messages_list').find('.msg').last().offset().top;
        $('.Messages').animate({ scrollTop: lastMsg }, 'slow');
      });
    });
  }, []);

  return (
    <div className="botIcon">
      <div className="botIconContainer">
        <div className="iconInner">
          <i className="fa fa-commenting" aria-hidden="true"></i>
        </div>
      </div>
      <div className="Layout Layout-open Layout-expand Layout-right">
        <div className="Messenger_messenger">
          <div className="Messenger_header">
            <h4 className="Messenger_prompt">How can we help you?</h4>
            <span className="chat_close_icon"><i className="fa fa-window-close" aria-hidden="true"></i></span>
          </div>
          <div className="Messenger_content">
            <div className="Messages">
              <div className="Messages_list"></div>
            </div>
            <form id="messenger">
              <div className="Input Input-blank">
                <input name="msg" className="Input_field" placeholder="Send a message..." />
                <button type="submit" className="Input_button Input_button-send">
                  <div className="Icon">
                    <svg viewBox="1496 193 57 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="Group-9-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)">
                        <path d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C5.08414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z" id="sendicon" fill="#96AAB4" fillRule="nonzero"></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
