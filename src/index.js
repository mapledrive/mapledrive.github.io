import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Main} from './components/Main';
import {Navigation} from './components/Navigation';
import {Bottom} from './components/Bottom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";






var initialState =
[
  {
    "title": "Mueller Recommends Sentence of 19-24 Years for Paul Manafort",
    "link": "https://www.reddit.com/r/politics/comments/ar3unv/mueller_recommends_sentence_of_1924_years_for/",
    "pubDate": "2019-02-16T01:36:39.000Z",
    "author": "/u/PoliticsModeratorBot",
    "content": "<!-- SC_OFF --><div class=\"md\"><p>Paul Manafort, the one-time chairman of Donald Trump’s presidential campaign, could spend more than 19 years in prison on tax and bank fraud charges, according to court papers filed Friday.</p> <hr/> <h2>Submissions that may interest you</h2> <table><thead> <tr> <th>SUBMISSION</th> <th>DOMAIN</th> </tr> </thead><tbody> <tr> <td><a href=\"https://www.businessinsider.com/mueller-sentencing-memo-paul-manafort-2019-2\">Mueller recommends a prison sentence of up to 24.5 years for Paul Manafort after a federal judge voided his plea deal for lying to investigators</a></td> <td>businessinsider.com</td> </tr> <tr> <td><a href=\"https://www.rollingstone.com/politics/politics-news/manafort-sentencing-795527/\">Mueller Recommends up to 24 Years for Paul Manafort</a></td> <td>rollingstone.com</td> </tr> <tr> <td><a href=\"https://www.politico.com/story/2019/02/15/mueller-manafort-sentencing-1173314\">Mueller: Manafort deserves 19.5 to 24.5 years in prison for Virginia convictions</a></td> <td>politico.com</td> </tr> <tr> <td><a href=\"https://www.bloomberg.com/news/articles/2019-02-16/mueller-recommends-19-24-years-in-prison-for-paul-manafort\">Mueller Recommends 19-24 Years in Prison for Paul Manafort</a></td> <td>bloomberg.com</td> </tr> <tr> <td><a href=\"https://thehill.com/policy/national-security/430302-mueller-recommends-prison-time-for-manafort\">Mueller recommends Manafort serve at least 19 years in prison</a></td> <td>thehill.com</td> </tr> <tr> <td><a href=\"https://www.independent.co.uk/news/world/americas/us-politics/paul-manafort-donald-trump-robert-muller-russia-collusion-20-years-prison-a8782081.html\">Paul Manafort should be sentenced to up to 24 years in prison, Mueller says</a></td> <td>independent.co.uk</td> </tr> <tr> <td><a href=\"https://www.axios.com/mueller-investigation-paul-manafort-sentence-7e78d54d-ed73-43a2-a671-d697f78b5d39.html\">Mueller says Paul Manafort should serve 19-24 years in prison.</a></td> <td>axios.com</td> </tr> <tr> <td><a href=\"https://www.buzzfeednews.com/article/zoetillman/paul-manafort-mueller-prison-memo-virginia\">Mueller&#39;s Office Says Paul Manafort Is Facing As Much As 24 Years In Prison</a></td> <td>buzzfeednews.com</td> </tr> <tr> <td><a href=\"https://www.theguardian.com/us-news/2019/feb/15/paul-manafort-sentencing-mueller-trump-russia\">Paul Manafort should be sentenced to up to 24 years in prison, Mueller says</a></td> <td>theguardian.com</td> </tr> <tr> <td><a href=\"https://www.usatoday.com/story/news/politics/2019/02/15/paul-manafort-deserves-prison-sentence-20-years-mueller-says/2881393002/\">Mueller&#39;s office seeks prison sentence of 20 years or more for ex-Trump campaign chairman Paul Manafort</a></td> <td>usatoday.com</td> </tr> <tr> <td><a href=\"https://www.cnbc.com/2019/02/15/special-counsel-robert-mueller-wants-ex-trump-campaign-boss-paul-manafort-imprisoned-for-up-to-24-years.html\">Special counsel Robert Mueller wants ex-Trump campaign boss Paul Manafort imprisoned for up to 24 years</a></td> <td>cnbc.com</td> </tr> <tr> <td><a href=\"https://www.msnbc.com/hardball/watch/mueller-prosecutors-recommend-19-24-years-in-manafort-case-1443587651579\">Mueller prosecutors recommend 19-24 years in Manafort case</a></td> <td>msnbc.com</td> </tr> <tr> <td><a href=\"https://www.thedailybeast.com/69-year-old-unrepentant-crook-paul-manafort-looking-at-decades-in-prison\">69-Year-Old ‘Unrepentant Crook’ Paul Manafort Looking at Decades In Prison</a></td> <td>thedailybeast.com</td> </tr> <tr> <td><a href=\"https://www.apnews.com/81fbe4996b0a445c88368428842badf3\">Court filing: Manafort faces more than 19 years in prison</a></td> <td>apnews.com</td> </tr> <tr> <td><a href=\"https://www.cnn.com/2019/02/15/politics/read-paul-manafort-sealed-hearing-transcript/index.html\">Transcript of Paul Manafort sealed hearing</a></td> <td>cnn.com</td> </tr> <tr> <td><a href=\"https://www.washingtonpost.com/politics/courts_law/court-filing-manafort-faces-more-than-19-years-in-prison/2019/02/15/02c46016-3183-11e9-8781-763619f12cb4_story.html\">Court filing: Manafort faces more than 19 years in prison</a></td> <td>washingtonpost.com</td> </tr> <tr> <td><a href=\"https://www.bloomberg.com/news/articles/2019-02-16/court-filing-manafort-faces-more-than-19-years-in-prison\">Court Filing: Manafort Faces More Than 19 Years in Prison</a></td> <td>bloomberg.com</td> </tr> <tr> <td><a href=\"https://www.lawfareblog.com/document-special-counsel-files-manafort-sentencing-memo\">Document: Special Counsel Files Manafort Sentencing Memo</a></td> <td>lawfareblog.com</td> </tr> <tr> <td><a href=\"https://edition.cnn.com/2019/02/15/politics/paul-manafort-sentencing-hearing/index.html\">Mueller&#39;s team says Paul Manafort deserves up to 24.5 years in prison</a></td> <td>edition.cnn.com</td> </tr> <tr> <td><a href=\"https://thinkprogress.org/mueller-tells-court-that-manafort-should-stay-in-prison-for-decades-fd2ea39ec392/\">Mueller tells court that Manafort should stay in prison for decades</a></td> <td>thinkprogress.org</td> </tr> </tbody></table> </div><!-- SC_ON --> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/PoliticsModeratorBot\"> /u/PoliticsModeratorBot </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/politics/\"> r/politics </a> <br/> <span><a href=\"https://www.reddit.com/r/politics/comments/ar3unv/mueller_recommends_sentence_of_1924_years_for/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/politics/comments/ar3unv/mueller_recommends_sentence_of_1924_years_for/\">[comments]</a></span>",
    "contentSnippet": "Paul Manafort, the one-time chairman of Donald Trump’s presidential campaign, could spend more than 19 years in prison on tax and bank fraud charges, according to court papers filed Friday.  Submissions that may interest you   SUBMISSION DOMAIN    Mueller recommends a prison sentence of up to 24.5 years for Paul Manafort after a federal judge voided his plea deal for lying to investigators businessinsider.com   Mueller Recommends up to 24 Years for Paul Manafort rollingstone.com   Mueller: Manafort deserves 19.5 to 24.5 years in prison for Virginia convictions politico.com   Mueller Recommends 19-24 Years in Prison for Paul Manafort bloomberg.com   Mueller recommends Manafort serve at least 19 years in prison thehill.com   Paul Manafort should be sentenced to up to 24 years in prison, Mueller says independent.co.uk   Mueller says Paul Manafort should serve 19-24 years in prison. axios.com   Mueller's Office Says Paul Manafort Is Facing As Much As 24 Years In Prison buzzfeednews.com   Paul Manafort should be sentenced to up to 24 years in prison, Mueller says theguardian.com   Mueller's office seeks prison sentence of 20 years or more for ex-Trump campaign chairman Paul Manafort usatoday.com   Special counsel Robert Mueller wants ex-Trump campaign boss Paul Manafort imprisoned for up to 24 years cnbc.com   Mueller prosecutors recommend 19-24 years in Manafort case msnbc.com   69-Year-Old ‘Unrepentant Crook’ Paul Manafort Looking at Decades In Prison thedailybeast.com   Court filing: Manafort faces more than 19 years in prison apnews.com   Transcript of Paul Manafort sealed hearing cnn.com   Court filing: Manafort faces more than 19 years in prison washingtonpost.com   Court Filing: Manafort Faces More Than 19 Years in Prison bloomberg.com   Document: Special Counsel Files Manafort Sentencing Memo lawfareblog.com   Mueller's team says Paul Manafort deserves up to 24.5 years in prison edition.cnn.com   Mueller tells court that Manafort should stay in prison for decades thinkprogress.org      submitted by    /u/PoliticsModeratorBot    to    r/politics   [link]   [comments]",
    "id": "t3_ar3unv",
    "isoDate": "2019-02-16T01:36:39.000Z"
  },
  {
    "title": "Cone in a whirlpool",
    "link": "https://www.reddit.com/r/interestingasfuck/comments/ar8hxk/cone_in_a_whirlpool/",
    "pubDate": "2019-02-16T12:47:21.000Z",
    "author": "/u/Ghost_Animator",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/interestingasfuck/comments/ar8hxk/cone_in_a_whirlpool/\"> <img src=\"https://b.thumbs.redditmedia.com/bmo6B9GYFvWoZlzhZKNTOgJjlxx7b7Vhq-8YqUmcXyc.jpg\" alt=\"Cone in a whirlpool\" title=\"Cone in a whirlpool\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Ghost_Animator\"> /u/Ghost_Animator </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/interestingasfuck/\"> r/interestingasfuck </a> <br/> <span><a href=\"https://i.imgur.com/S5f07vT.gifv\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/interestingasfuck/comments/ar8hxk/cone_in_a_whirlpool/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/Ghost_Animator    to    r/interestingasfuck   [link]   [comments]",
    "id": "t3_ar8hxk",
    "isoDate": "2019-02-16T12:47:21.000Z"
  },
  {
    "title": "Tibetan woman elected student president in Canada, Chinese students enraged",
    "link": "https://www.reddit.com/r/worldnews/comments/ar5fiy/tibetan_woman_elected_student_president_in_canada/",
    "pubDate": "2019-02-16T04:47:43.000Z",
    "author": "/u/truebody",
    "content": "&#32; submitted by &#32; <a href=\"https://www.reddit.com/user/truebody\"> /u/truebody </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/worldnews/\"> r/worldnews </a> <br/> <span><a href=\"https://www.taiwannews.com.tw/en/news/3637320\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/worldnews/comments/ar5fiy/tibetan_woman_elected_student_president_in_canada/\">[comments]</a></span>",
    "contentSnippet": "submitted by    /u/truebody    to    r/worldnews   [link]   [comments]",
    "id": "t3_ar5fiy",
    "isoDate": "2019-02-16T04:47:43.000Z"
  },
  {
    "title": "Hotel workers of reddit, what is the worst thing you have found in a room after a guests stay?",
    "link": "https://www.reddit.com/r/AskReddit/comments/ar4pe8/hotel_workers_of_reddit_what_is_the_worst_thing/",
    "pubDate": "2019-02-16T03:18:39.000Z",
    "author": "/u/deveronii",
    "content": "&#32; submitted by &#32; <a href=\"https://www.reddit.com/user/deveronii\"> /u/deveronii </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/AskReddit/\"> r/AskReddit </a> <br/> <span><a href=\"https://www.reddit.com/r/AskReddit/comments/ar4pe8/hotel_workers_of_reddit_what_is_the_worst_thing/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/AskReddit/comments/ar4pe8/hotel_workers_of_reddit_what_is_the_worst_thing/\">[comments]</a></span>",
    "contentSnippet": "submitted by    /u/deveronii    to    r/AskReddit   [link]   [comments]",
    "id": "t3_ar4pe8",
    "isoDate": "2019-02-16T03:18:39.000Z"
  },
  {
    "title": "Shooting, large police presence reported in Aurora, Kane County Sheriff says",
    "link": "https://www.reddit.com/r/news/comments/ar0u9l/shooting_large_police_presence_reported_in_aurora/",
    "pubDate": "2019-02-15T20:25:16.000Z",
    "author": "/u/TFCKombatMedic",
    "content": "&#32; submitted by &#32; <a href=\"https://www.reddit.com/user/TFCKombatMedic\"> /u/TFCKombatMedic </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/news/\"> r/news </a> <br/> <span><a href=\"https://abc7chicago.com/watch-live-shooting-large-police-presence-reported-in-aurora-kane-county-sheriff-says/5140701/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/news/comments/ar0u9l/shooting_large_police_presence_reported_in_aurora/\">[comments]</a></span>",
    "contentSnippet": "submitted by    /u/TFCKombatMedic    to    r/news   [link]   [comments]",
    "id": "t3_ar0u9l",
    "isoDate": "2019-02-15T20:25:16.000Z"
  },
  {
    "title": "she was found dead btw",
    "link": "https://www.reddit.com/r/insanepeoplefacebook/comments/ar16y2/she_was_found_dead_btw/",
    "pubDate": "2019-02-15T20:59:02.000Z",
    "author": "/u/Calandracas666",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/insanepeoplefacebook/comments/ar16y2/she_was_found_dead_btw/\"> <img src=\"https://b.thumbs.redditmedia.com/cPG5jgClOTHXgUG1IzWfeOyx_NE9GuT4hT7S2sUdPzU.jpg\" alt=\"she was found dead btw\" title=\"she was found dead btw\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Calandracas666\"> /u/Calandracas666 </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/insanepeoplefacebook/\"> r/insanepeoplefacebook </a> <br/> <span><a href=\"https://i.redd.it/m8iqncn9qsg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/insanepeoplefacebook/comments/ar16y2/she_was_found_dead_btw/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/Calandracas666    to    r/insanepeoplefacebook   [link]   [comments]",
    "id": "t3_ar16y2",
    "isoDate": "2019-02-15T20:59:02.000Z"
  },
  {
    "title": "Stop making everything multiplayer, I don't have friends, you assholes",
    "link": "https://www.reddit.com/r/gaming/comments/ar5sec/stop_making_everything_multiplayer_i_dont_have/",
    "pubDate": "2019-02-16T05:34:23.000Z",
    "author": "/u/therealjustinjr",
    "content": "&#32; submitted by &#32; <a href=\"https://www.reddit.com/user/therealjustinjr\"> /u/therealjustinjr </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/gaming/\"> r/gaming </a> <br/> <span><a href=\"https://www.reddit.com/r/gaming/comments/ar5sec/stop_making_everything_multiplayer_i_dont_have/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/gaming/comments/ar5sec/stop_making_everything_multiplayer_i_dont_have/\">[comments]</a></span>",
    "contentSnippet": "submitted by    /u/therealjustinjr    to    r/gaming   [link]   [comments]",
    "id": "t3_ar5sec",
    "isoDate": "2019-02-16T05:34:23.000Z"
  },
  {
    "title": "Late night study partner",
    "link": "https://www.reddit.com/r/aww/comments/ar8ecv/late_night_study_partner/",
    "pubDate": "2019-02-16T12:31:08.000Z",
    "author": "/u/tszdabee",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/aww/comments/ar8ecv/late_night_study_partner/\"> <img src=\"https://b.thumbs.redditmedia.com/tWJFZU9Z7-NDX6n9PQWChQd7phSr4DNTxjsSTi_nTrE.jpg\" alt=\"Late night study partner\" title=\"Late night study partner\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/tszdabee\"> /u/tszdabee </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/aww/\"> r/aww </a> <br/> <span><a href=\"https://i.imgur.com/9Hs0vt8.gifv\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/aww/comments/ar8ecv/late_night_study_partner/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/tszdabee    to    r/aww   [link]   [comments]",
    "id": "t3_ar8ecv",
    "isoDate": "2019-02-16T12:31:08.000Z"
  },
  {
    "title": "Cone in a whirlpool",
    "link": "https://www.reddit.com/r/gifs/comments/ar8jj9/cone_in_a_whirlpool/",
    "pubDate": "2019-02-16T12:54:28.000Z",
    "author": "/u/_NITRISS_",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/gifs/comments/ar8jj9/cone_in_a_whirlpool/\"> <img src=\"https://b.thumbs.redditmedia.com/AwJ-HY0CAV4ShRLVDEeTRptXl4uriN90F3jW2knBo7I.jpg\" alt=\"Cone in a whirlpool\" title=\"Cone in a whirlpool\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/_NITRISS_\"> /u/_NITRISS_ </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/gifs/\"> r/gifs </a> <br/> <span><a href=\"https://i.imgur.com/kxDZFbW.gifv\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/gifs/comments/ar8jj9/cone_in_a_whirlpool/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/_NITRISS_    to    r/gifs   [link]   [comments]",
    "id": "t3_ar8jj9",
    "isoDate": "2019-02-16T12:54:28.000Z"
  },
  {
    "title": "All Oscar Categories to Air Live After Hollywood Protest",
    "link": "https://www.reddit.com/r/movies/comments/ar2fnd/all_oscar_categories_to_air_live_after_hollywood/",
    "pubDate": "2019-02-15T23:01:14.000Z",
    "author": "/u/SanderSo47",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/movies/comments/ar2fnd/all_oscar_categories_to_air_live_after_hollywood/\"> <img src=\"https://b.thumbs.redditmedia.com/jPtOcYcrFpfq7B3AJzsOIdWYGRdYKZtGIqH9UKSSk8s.jpg\" alt=\"All Oscar Categories to Air Live After Hollywood Protest\" title=\"All Oscar Categories to Air Live After Hollywood Protest\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/SanderSo47\"> /u/SanderSo47 </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/movies/\"> r/movies </a> <br/> <span><a href=\"https://variety.com/2019/film/news/all-oscar-categories-to-air-live-after-hollywood-protest-1203141496/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/movies/comments/ar2fnd/all_oscar_categories_to_air_live_after_hollywood/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/SanderSo47    to    r/movies   [link]   [comments]",
    "id": "t3_ar2fnd",
    "isoDate": "2019-02-15T23:01:14.000Z"
  },
  {
    "title": "Is Apple the only major brand not releasing a foldable phone in 2019? Probably",
    "link": "https://www.reddit.com/r/gadgets/comments/aqytx4/is_apple_the_only_major_brand_not_releasing_a/",
    "pubDate": "2019-02-15T17:18:53.000Z",
    "author": "/u/mspoonygp",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/gadgets/comments/aqytx4/is_apple_the_only_major_brand_not_releasing_a/\"> <img src=\"https://b.thumbs.redditmedia.com/1_wbpj6Cxfmt9T_hMSOUJ5fp9s7BhGKzjkPeAUS6nvI.jpg\" alt=\"Is Apple the only major brand not releasing a foldable phone in 2019? Probably\" title=\"Is Apple the only major brand not releasing a foldable phone in 2019? Probably\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/mspoonygp\"> /u/mspoonygp </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/gadgets/\"> r/gadgets </a> <br/> <span><a href=\"https://www.tomsguide.com/us/vivo-foldable-phone-rumors,news-29430.html\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/gadgets/comments/aqytx4/is_apple_the_only_major_brand_not_releasing_a/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/mspoonygp    to    r/gadgets   [link]   [comments]",
    "id": "t3_aqytx4",
    "isoDate": "2019-02-15T17:18:53.000Z"
  },
  {
    "title": "In the US, liberals are more willing to grant legitimacy to governments led by conservatives than vice versa. Furthermore, conservatives demonstrate more trust in government when it's led by conservatives than liberals trust government when it's led by liberals.",
    "link": "https://www.reddit.com/r/science/comments/ar30lt/in_the_us_liberals_are_more_willing_to_grant/",
    "pubDate": "2019-02-16T00:02:22.000Z",
    "author": "/u/smurfyjenkins",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/science/comments/ar30lt/in_the_us_liberals_are_more_willing_to_grant/\"> <img src=\"https://b.thumbs.redditmedia.com/rvbTlQBwvHDLYw9iq7yI6r99MEiRDOINHZJVbrv8ezw.jpg\" alt=\"In the US, liberals are more willing to grant legitimacy to governments led by conservatives than vice versa. Furthermore, conservatives demonstrate more trust in government when it's led by conservatives than liberals trust government when it's led by liberals.\" title=\"In the US, liberals are more willing to grant legitimacy to governments led by conservatives than vice versa. Furthermore, conservatives demonstrate more trust in government when it's led by conservatives than liberals trust government when it's led by liberals.\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/smurfyjenkins\"> /u/smurfyjenkins </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/science/\"> r/science </a> <br/> <span><a href=\"https://www.cambridge.org/core/journals/american-political-science-review/article/an-asymmetrical-presidentinpower-effect/569413D40D79A79C3F7CA6F2183743B9\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/science/comments/ar30lt/in_the_us_liberals_are_more_willing_to_grant/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/smurfyjenkins    to    r/science   [link]   [comments]",
    "id": "t3_ar30lt",
    "isoDate": "2019-02-16T00:02:22.000Z"
  },
  {
    "title": "2.15.2019: An Update From Respawn",
    "link": "https://www.reddit.com/r/apexlegends/comments/ar55zj/2152019_an_update_from_respawn/",
    "pubDate": "2019-02-16T04:13:50.000Z",
    "author": "/u/Jayfresh_Respawn",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/apexlegends/comments/ar55zj/2152019_an_update_from_respawn/\"> <img src=\"https://b.thumbs.redditmedia.com/OhU9dNa_RfhAPnkKXud7l5w31hOUkgamckY_8uLFvdY.jpg\" alt=\"2.15.2019: An Update From Respawn\" title=\"2.15.2019: An Update From Respawn\" /> </a> </td><td> <!-- SC_OFF --><div class=\"md\"><p>&#x200B;</p> <p><a href=\"https://i.redd.it/thhn6qshuug21.jpg\">https://i.redd.it/thhn6qshuug21.jpg</a></p> <p>Lots to talk about! </p> <p>&#x200B;</p> <p><strong>THE CRASHES</strong></p> <p>We know this has been frustrating for many of you across all platforms. We hear you and we take this issue seriously. Improving stability, performance, and quality of life is a big priority for us and we have a lot of work to do. We pushed our first patch out earlier this week and we’ve got many more coming [including one next week!]. We’ll always provide patch notes when these come out. No I can’t tell you what’s in it yet. </p> <p>&#x200B;</p> <p><strong>WHAT HAPPENS WHEN I REPORT SOMETHING?</strong></p> <p>We’re always listening and looking for reported issues. As you can imagine, when you drop your game out of nowhere and 25 million people show up in the first week, there’s going to be all kinds of issues, bugs, exploits, etc. discovered. Our customer service team provides daily reports and many folks on the dev team are finding and emailing links of reported issues across social channels and reddit. We’ve also got some rad tools that capture all kinds of data from the game, measure sentiment, and provide insight into what the most talked about things are around Apex Legends. </p> <p>When issues are reported they are curated by our wonderful QA team who attempts to reproduce the issue based on the info they have. If they are able to reproduce it, a ticket is created and they are added to the rest of the known issues, prioritized, scheduled, and assigned to the proper devs to address it. How do we prioritize? We use data to inform us of how many people are being affected, how damaging the exploit could be, how much resources it would take to fix it, etc. </p> <p>&#x200B;</p> <p><a href=\"https://i.redd.it/emm6m87kuug21.jpg\">https://i.redd.it/emm6m87kuug21.jpg</a></p> <p><strong>HELP US HELP YOU</strong></p> <p>If we can’t reproduce the issue locally, it’s pretty impossible to fix it. That’s why it’s super important that when you report an issue you’re experiencing, you provide as much information as possible. If you just post: “My game keeps crashing. Fix it.”, there’s not a lot we can do to help you, and we really want to help you! </p> <p>So, help us help you. Best place to report bugs is using the link below and following some steps:</p> <p><a href=\"https://answers.ea.com/t5/Bug-Reports/bd-p/apex-legends-bug-reports-en\">https://answers.ea.com/t5/Bug-Reports/bd-p/apex-legends-bug-reports-en</a> </p> <ul> <li>What platform are you playing on?</li> <li>Origin ID / Gamertag / PSN</li> <li>What were you doing leading up to the issue?</li> <li>Can you reproduce it? What are the steps?</li> <li>PC players - provide hardware specs, OS version and GPU driver version.</li> <li>If possible, it’s great if you can capture a screenshot / picture or video. </li> <li>Pay attention for dev updates. </li> </ul> <p>&#x200B;</p> <p><strong>CHEATERS</strong></p> <p>As of today over 16,000 cheaters have been identified and banned from the game. Cheaters suck. If you run into one, please try and capture the evidence and let us know here: <a href=\"https://www.easy.ac/en-us/support/apexlegends/contact/report/\">https://www.easy.ac/en-us/support/apexlegends/contact/report/</a></p> <p>Even if you don’t get proof, get their ID and flag it and we can investigate the account. We have heard your feedback about a report feature in the game. I’ll just say that’s a very good idea :)</p> <p>&#x200B;</p> <p>&#x200B;</p> <p><a href=\"https://i.redd.it/umfahlfmuug21.jpg\">https://i.redd.it/umfahlfmuug21.jpg</a></p> <p><strong>OUR ONGOING CONVERSATION</strong></p> <p>Your trust is truly important to us. Seriously. We said at launch that we will always strive to be direct, honest, and as transparent as we can with all of you. This is how we’ll be starting to do that:</p> <ul> <li>We’re going to start doing more regular updates like this moving forward. I’ll be making posts daily starting Tuesday next week. Not all of these will be ground breaking or major news but think of it as our way of checking in each day to address what we can.</li> <li>Livestreams! As we speak, a production team is building a rad soundstage and set right here at Respawn. I can’t wait to get it up and running and start putting on shows with the team. We will debut our first developer stream around the launch of Season 1. </li> <li>With the permission of you all and the mod team, I’d like to have a dedicated spot here where I can provide a list of troubleshooting tips for some issues folks are having. </li> <li>Couple more things in the works that we&#39;ll talk about more in the near future.<br/></li> </ul> <p>&#x200B;</p> <p>I wish I could respond to each and every one of you but it’s physically impossible. For context: I currently have nearly 6K responses and over 50 message requests in my inbox, and that’s just this subreddit. Trust me when I say that myself, and many folks on the team are here reading your posts and it’s been the best feeling seeing our baby out in the wild and taking on a life of its own through you. </p> <p>&#x200B;</p> <p>Enjoy the weekend, be kind to each other, and have fun! Next update on Tuesday.</p> </div><!-- SC_ON --> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Jayfresh_Respawn\"> /u/Jayfresh_Respawn </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/apexlegends/\"> r/apexlegends </a> <br/> <span><a href=\"https://www.reddit.com/r/apexlegends/comments/ar55zj/2152019_an_update_from_respawn/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/apexlegends/comments/ar55zj/2152019_an_update_from_respawn/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "​ https://i.redd.it/thhn6qshuug21.jpg Lots to talk about!  ​ THE CRASHES We know this has been frustrating for many of you across all platforms. We hear you and we take this issue seriously. Improving stability, performance, and quality of life is a big priority for us and we have a lot of work to do. We pushed our first patch out earlier this week and we’ve got many more coming [including one next week!]. We’ll always provide patch notes when these come out. No I can’t tell you what’s in it yet.  ​ WHAT HAPPENS WHEN I REPORT SOMETHING? We’re always listening and looking for reported issues. As you can imagine, when you drop your game out of nowhere and 25 million people show up in the first week, there’s going to be all kinds of issues, bugs, exploits, etc. discovered. Our customer service team provides daily reports and many folks on the dev team are finding and emailing links of reported issues across social channels and reddit. We’ve also got some rad tools that capture all kinds of data from the game, measure sentiment, and provide insight into what the most talked about things are around Apex Legends.  When issues are reported they are curated by our wonderful QA team who attempts to reproduce the issue based on the info they have. If they are able to reproduce it, a ticket is created and they are added to the rest of the known issues, prioritized, scheduled, and assigned to the proper devs to address it. How do we prioritize? We use data to inform us of how many people are being affected, how damaging the exploit could be, how much resources it would take to fix it, etc.  ​ https://i.redd.it/emm6m87kuug21.jpg HELP US HELP YOU If we can’t reproduce the issue locally, it’s pretty impossible to fix it. That’s why it’s super important that when you report an issue you’re experiencing, you provide as much information as possible. If you just post: “My game keeps crashing. Fix it.”, there’s not a lot we can do to help you, and we really want to help you!  So, help us help you. Best place to report bugs is using the link below and following some steps: https://answers.ea.com/t5/Bug-Reports/bd-p/apex-legends-bug-reports-en   What platform are you playing on? Origin ID / Gamertag / PSN What were you doing leading up to the issue? Can you reproduce it? What are the steps? PC players - provide hardware specs, OS version and GPU driver version. If possible, it’s great if you can capture a screenshot / picture or video.  Pay attention for dev updates.   ​ CHEATERS As of today over 16,000 cheaters have been identified and banned from the game. Cheaters suck. If you run into one, please try and capture the evidence and let us know here: https://www.easy.ac/en-us/support/apexlegends/contact/report/ Even if you don’t get proof, get their ID and flag it and we can investigate the account. We have heard your feedback about a report feature in the game. I’ll just say that’s a very good idea :) ​ ​ https://i.redd.it/umfahlfmuug21.jpg OUR ONGOING CONVERSATION Your trust is truly important to us. Seriously. We said at launch that we will always strive to be direct, honest, and as transparent as we can with all of you. This is how we’ll be starting to do that:  We’re going to start doing more regular updates like this moving forward. I’ll be making posts daily starting Tuesday next week. Not all of these will be ground breaking or major news but think of it as our way of checking in each day to address what we can. Livestreams! As we speak, a production team is building a rad soundstage and set right here at Respawn. I can’t wait to get it up and running and start putting on shows with the team. We will debut our first developer stream around the launch of Season 1.  With the permission of you all and the mod team, I’d like to have a dedicated spot here where I can provide a list of troubleshooting tips for some issues folks are having.  Couple more things in the works that we'll talk about more in the near future.  ​ I wish I could respond to each and every one of you but it’s physically impossible. For context: I currently have nearly 6K responses and over 50 message requests in my inbox, and that’s just this subreddit. Trust me when I say that myself, and many folks on the team are here reading your posts and it’s been the best feeling seeing our baby out in the wild and taking on a life of its own through you.  ​ Enjoy the weekend, be kind to each other, and have fun! Next update on Tuesday.    submitted by    /u/Jayfresh_Respawn    to    r/apexlegends   [link]   [comments]",
    "id": "t3_ar55zj",
    "isoDate": "2019-02-16T04:13:50.000Z"
  },
  {
    "title": "This guy followed my wife and son home from the park. he had a chip and we found the owner lived 25 miles away from us. We returned him and the next day we received a call from the owner asking us if we wanted to keep him. Reddit meet Boomer. :)",
    "link": "https://www.reddit.com/r/aww/comments/ar5rc4/this_guy_followed_my_wife_and_son_home_from_the/",
    "pubDate": "2019-02-16T05:30:40.000Z",
    "author": "/u/widespreadone",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/aww/comments/ar5rc4/this_guy_followed_my_wife_and_son_home_from_the/\"> <img src=\"https://b.thumbs.redditmedia.com/tTaoUYlP0ywxA2M8jHYQDptc1LBDy8kMFHMybh32eBE.jpg\" alt=\"This guy followed my wife and son home from the park. he had a chip and we found the owner lived 25 miles away from us. We returned him and the next day we received a call from the owner asking us if we wanted to keep him. Reddit meet Boomer. :)\" title=\"This guy followed my wife and son home from the park. he had a chip and we found the owner lived 25 miles away from us. We returned him and the next day we received a call from the owner asking us if we wanted to keep him. Reddit meet Boomer. :)\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/widespreadone\"> /u/widespreadone </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/aww/\"> r/aww </a> <br/> <span><a href=\"https://i.redd.it/l6vv9azk9vg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/aww/comments/ar5rc4/this_guy_followed_my_wife_and_son_home_from_the/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/widespreadone    to    r/aww   [link]   [comments]",
    "id": "t3_ar5rc4",
    "isoDate": "2019-02-16T05:30:40.000Z"
  },
  {
    "title": "All that’s missing is Don Draper and Bill the Butcher",
    "link": "https://www.reddit.com/r/justneckbeardthings/comments/ar036h/all_thats_missing_is_don_draper_and_bill_the/",
    "pubDate": "2019-02-15T19:15:10.000Z",
    "author": "/u/EndlessTrashposter",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/justneckbeardthings/comments/ar036h/all_thats_missing_is_don_draper_and_bill_the/\"> <img src=\"https://b.thumbs.redditmedia.com/lSIuxUPCJTA8w0cwgp3NcJgR1JkZ-ZLy32TY8OOfuMI.jpg\" alt=\"All that’s missing is Don Draper and Bill the Butcher\" title=\"All that’s missing is Don Draper and Bill the Butcher\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/EndlessTrashposter\"> /u/EndlessTrashposter </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/justneckbeardthings/\"> r/justneckbeardthings </a> <br/> <span><a href=\"https://i.redd.it/llwu3lxr7sg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/justneckbeardthings/comments/ar036h/all_thats_missing_is_don_draper_and_bill_the/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/EndlessTrashposter    to    r/justneckbeardthings   [link]   [comments]",
    "id": "t3_ar036h",
    "isoDate": "2019-02-15T19:15:10.000Z"
  },
  {
    "title": "This is Sara Bareilles… Ask Me Anything!!",
    "link": "https://www.reddit.com/r/Music/comments/ar0fdc/this_is_sara_bareilles_ask_me_anything/",
    "pubDate": "2019-02-15T19:45:58.000Z",
    "author": "/u/Sarabmusic",
    "content": "<!-- SC_OFF --><div class=\"md\"><p>Hi Reddit! It&#39;s Sara Bareilles. Sorry, it&#39;s been a while.. I am so excited to talk to and reconnect with my beautiful fans today! My new record, AMIDST THE CHAOS, is available for pre-order now and will be released on April 5th!! You can also hear my new single “Fire.” I&#39;m here &amp; ready to answer anything! AMA!! Proof: <a href=\"https://i.redd.it/i8ybdtzwtng21.jpg\">https://i.redd.it/i8ybdtzwtng21.jpg</a></p> <p>Link to pre-add/pre-save: <a href=\"https://forms.sonymusicfans.com/campaign/amidst-the-chaos-sara-bareilles/\">https://forms.sonymusicfans.com/campaign/amidst-the-chaos-sara-bareilles/</a> </p> <p>Thank you so much for chatting with me today. I love getting to connect with you all!</p> </div><!-- SC_ON --> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Sarabmusic\"> /u/Sarabmusic </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/Music/\"> r/Music </a> <br/> <span><a href=\"https://www.reddit.com/r/Music/comments/ar0fdc/this_is_sara_bareilles_ask_me_anything/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/Music/comments/ar0fdc/this_is_sara_bareilles_ask_me_anything/\">[comments]</a></span>",
    "contentSnippet": "Hi Reddit! It's Sara Bareilles. Sorry, it's been a while.. I am so excited to talk to and reconnect with my beautiful fans today! My new record, AMIDST THE CHAOS, is available for pre-order now and will be released on April 5th!! You can also hear my new single “Fire.” I'm here & ready to answer anything! AMA!! Proof: https://i.redd.it/i8ybdtzwtng21.jpg Link to pre-add/pre-save: https://forms.sonymusicfans.com/campaign/amidst-the-chaos-sara-bareilles/  Thank you so much for chatting with me today. I love getting to connect with you all!    submitted by    /u/Sarabmusic    to    r/Music   [link]   [comments]",
    "id": "t3_ar0fdc",
    "isoDate": "2019-02-15T19:45:58.000Z"
  },
  {
    "title": "Police forgets capsicum sprays are flammable",
    "link": "https://www.reddit.com/r/Wellthatsucks/comments/ar1l0w/police_forgets_capsicum_sprays_are_flammable/",
    "pubDate": "2019-02-15T21:35:50.000Z",
    "author": "/u/Teerendog",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/Wellthatsucks/comments/ar1l0w/police_forgets_capsicum_sprays_are_flammable/\"> <img src=\"https://b.thumbs.redditmedia.com/Ha_TyKWlnSFwhEl2amD0rhCKneU_OjDOcFLf9dnwjUI.jpg\" alt=\"Police forgets capsicum sprays are flammable\" title=\"Police forgets capsicum sprays are flammable\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Teerendog\"> /u/Teerendog </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/Wellthatsucks/\"> r/Wellthatsucks </a> <br/> <span><a href=\"https://i.redd.it/shoegcdvwsg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/Wellthatsucks/comments/ar1l0w/police_forgets_capsicum_sprays_are_flammable/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/Teerendog    to    r/Wellthatsucks   [link]   [comments]",
    "id": "t3_ar1l0w",
    "isoDate": "2019-02-15T21:35:50.000Z"
  },
  {
    "title": "TIL that in 36 BCE, Roman statesman Marcus Varro wrote about germs, describing \"minute creatures which cannot be seen by the eyes, which...enter the body through the mouth and nose and there cause serious diseases.\" The germ theory of disease would not be accepted widely for another 1,900 years.",
    "link": "https://www.reddit.com/r/todayilearned/comments/ar208c/til_that_in_36_bce_roman_statesman_marcus_varro/",
    "pubDate": "2019-02-15T22:17:10.000Z",
    "author": "/u/IHad360K_KarmaDammit",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/todayilearned/comments/ar208c/til_that_in_36_bce_roman_statesman_marcus_varro/\"> <img src=\"https://b.thumbs.redditmedia.com/u9w7j_3tFkkJmf2GvRq9fbaprafxj3MG9GS5--7jGwI.jpg\" alt=\"TIL that in 36 BCE, Roman statesman Marcus Varro wrote about germs, describing &quot;minute creatures which cannot be seen by the eyes, which...enter the body through the mouth and nose and there cause serious diseases.&quot; The germ theory of disease would not be accepted widely for another 1,900 years.\" title=\"TIL that in 36 BCE, Roman statesman Marcus Varro wrote about germs, describing &quot;minute creatures which cannot be seen by the eyes, which...enter the body through the mouth and nose and there cause serious diseases.&quot; The germ theory of disease would not be accepted widely for another 1,900 years.\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/IHad360K_KarmaDammit\"> /u/IHad360K_KarmaDammit </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/todayilearned/\"> r/todayilearned </a> <br/> <span><a href=\"https://en.wikipedia.org/wiki/Germ_theory_of_disease\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/todayilearned/comments/ar208c/til_that_in_36_bce_roman_statesman_marcus_varro/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/IHad360K_KarmaDammit    to    r/todayilearned   [link]   [comments]",
    "id": "t3_ar208c",
    "isoDate": "2019-02-15T22:17:10.000Z"
  },
  {
    "title": "Socialism!",
    "link": "https://www.reddit.com/r/WhitePeopleTwitter/comments/ar7gv6/socialism/",
    "pubDate": "2019-02-16T10:01:10.000Z",
    "author": "/u/Sky_Browning",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/WhitePeopleTwitter/comments/ar7gv6/socialism/\"> <img src=\"https://b.thumbs.redditmedia.com/n8NzbzU6ErAltp-nAUg9T_JULPQZUom0jLFuGJ_cehc.jpg\" alt=\"Socialism!\" title=\"Socialism!\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/Sky_Browning\"> /u/Sky_Browning </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/WhitePeopleTwitter/\"> r/WhitePeopleTwitter </a> <br/> <span><a href=\"https://i.imgur.com/xqI2p7S.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/WhitePeopleTwitter/comments/ar7gv6/socialism/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/Sky_Browning    to    r/WhitePeopleTwitter   [link]   [comments]",
    "id": "t3_ar7gv6",
    "isoDate": "2019-02-16T10:01:10.000Z"
  },
  {
    "title": "Dems prepare to force Trump to reveal private talks with Putin",
    "link": "https://www.reddit.com/r/politics/comments/ar88c3/dems_prepare_to_force_trump_to_reveal_private/",
    "pubDate": "2019-02-16T12:05:21.000Z",
    "author": "/u/progress18",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/politics/comments/ar88c3/dems_prepare_to_force_trump_to_reveal_private/\"> <img src=\"https://b.thumbs.redditmedia.com/9g3lFZMbG1vISsMwOAcYP2GVuuulLUd36VypIc5q9eE.jpg\" alt=\"Dems prepare to force Trump to reveal private talks with Putin\" title=\"Dems prepare to force Trump to reveal private talks with Putin\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/progress18\"> /u/progress18 </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/politics/\"> r/politics </a> <br/> <span><a href=\"https://www.politico.com/story/2019/02/16/dems-trump-putin-private-talks-1173275\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/politics/comments/ar88c3/dems_prepare_to_force_trump_to_reveal_private/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/progress18    to    r/politics   [link]   [comments]",
    "id": "t3_ar88c3",
    "isoDate": "2019-02-16T12:05:21.000Z"
  },
  {
    "title": "Wondered why my new sheets felt like garbage 😡",
    "link": "https://www.reddit.com/r/assholedesign/comments/ar2hu7/wondered_why_my_new_sheets_felt_like_garbage/",
    "pubDate": "2019-02-15T23:07:32.000Z",
    "author": "/u/NarplePlex",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/assholedesign/comments/ar2hu7/wondered_why_my_new_sheets_felt_like_garbage/\"> <img src=\"https://b.thumbs.redditmedia.com/Buc6nSfjVJaI0BEi66bt4gOutAKyeymx9Y3G6QLJ56M.jpg\" alt=\"Wondered why my new sheets felt like garbage 😡\" title=\"Wondered why my new sheets felt like garbage 😡\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/NarplePlex\"> /u/NarplePlex </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/assholedesign/\"> r/assholedesign </a> <br/> <span><a href=\"https://i.redd.it/i4jsam68dtg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/assholedesign/comments/ar2hu7/wondered_why_my_new_sheets_felt_like_garbage/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/NarplePlex    to    r/assholedesign   [link]   [comments]",
    "id": "t3_ar2hu7",
    "isoDate": "2019-02-15T23:07:32.000Z"
  },
  {
    "title": "My cousin, who has a rare developmental disorder, went on her first date yesterday before a dance. She is so happy!",
    "link": "https://www.reddit.com/r/MadeMeSmile/comments/ar873m/my_cousin_who_has_a_rare_developmental_disorder/",
    "pubDate": "2019-02-16T12:00:45.000Z",
    "author": "/u/BooAnna",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/MadeMeSmile/comments/ar873m/my_cousin_who_has_a_rare_developmental_disorder/\"> <img src=\"https://b.thumbs.redditmedia.com/S8F1WvLSu0ogm1ol3Cl6F1cY_U5UfVORwvr52QFACxY.jpg\" alt=\"My cousin, who has a rare developmental disorder, went on her first date yesterday before a dance. She is so happy!\" title=\"My cousin, who has a rare developmental disorder, went on her first date yesterday before a dance. She is so happy!\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/BooAnna\"> /u/BooAnna </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/MadeMeSmile/\"> r/MadeMeSmile </a> <br/> <span><a href=\"https://i.redd.it/ajts3ie67xg21.jpg\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/MadeMeSmile/comments/ar873m/my_cousin_who_has_a_rare_developmental_disorder/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/BooAnna    to    r/MadeMeSmile   [link]   [comments]",
    "id": "t3_ar873m",
    "isoDate": "2019-02-16T12:00:45.000Z"
  },
  {
    "title": "Marner of the Toronto Maple Leafs makes a girl’s Valentine’s Day",
    "link": "https://www.reddit.com/r/sports/comments/ar2poa/marner_of_the_toronto_maple_leafs_makes_a_girls/",
    "pubDate": "2019-02-15T23:30:35.000Z",
    "author": "/u/dickfromaccounting",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/sports/comments/ar2poa/marner_of_the_toronto_maple_leafs_makes_a_girls/\"> <img src=\"https://b.thumbs.redditmedia.com/ybxxzhJDv4VFdA_mvLc4pYsXx2bOY4GUUOAbRyaX-LI.jpg\" alt=\"Marner of the Toronto Maple Leafs makes a girl’s Valentine’s Day\" title=\"Marner of the Toronto Maple Leafs makes a girl’s Valentine’s Day\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/dickfromaccounting\"> /u/dickfromaccounting </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/sports/\"> r/sports </a> <br/> <span><a href=\"https://i.imgur.com/LwaX90N.gifv\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/sports/comments/ar2poa/marner_of_the_toronto_maple_leafs_makes_a_girls/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/dickfromaccounting    to    r/sports   [link]   [comments]",
    "id": "t3_ar2poa",
    "isoDate": "2019-02-15T23:30:35.000Z"
  },
  {
    "title": "Bruno Ganz has died today. He was internationally renowned for portraying Adolf Hitler in the film Downfall.",
    "link": "https://www.reddit.com/r/videos/comments/ar7qgi/bruno_ganz_has_died_today_he_was_internationally/",
    "pubDate": "2019-02-16T10:45:02.000Z",
    "author": "/u/unknown_human",
    "content": "<table> <tr><td> <a href=\"https://www.reddit.com/r/videos/comments/ar7qgi/bruno_ganz_has_died_today_he_was_internationally/\"> <img src=\"https://a.thumbs.redditmedia.com/VhEC0xN-WVTFqDuDUy5l90T5ixreSX8bpkF7BODbsC0.jpg\" alt=\"Bruno Ganz has died today. He was internationally renowned for portraying Adolf Hitler in the film Downfall.\" title=\"Bruno Ganz has died today. He was internationally renowned for portraying Adolf Hitler in the film Downfall.\" /> </a> </td><td> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/unknown_human\"> /u/unknown_human </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/videos/\"> r/videos </a> <br/> <span><a href=\"https://youtu.be/t7PmzdINGZk\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/videos/comments/ar7qgi/bruno_ganz_has_died_today_he_was_internationally/\">[comments]</a></span> </td></tr></table>",
    "contentSnippet": "submitted by    /u/unknown_human    to    r/videos   [link]   [comments]",
    "id": "t3_ar7qgi",
    "isoDate": "2019-02-16T10:45:02.000Z"
  },
  {
    "title": "TIFU Deepthroating my boyfriend after eating chocolate ice cream on Valentine’s Day",
    "link": "https://www.reddit.com/r/tifu/comments/ar1jv7/tifu_deepthroating_my_boyfriend_after_eating/",
    "pubDate": "2019-02-15T21:32:47.000Z",
    "author": "/u/chocolateicecreambj",
    "content": "<!-- SC_OFF --><div class=\"md\"><p>As one might think on Valentine’s Day in particular, people like to get up to some frisky business, myself included. After indulging in some post-dinner beer and chocolate ice cream, my boyfriend and I (F) decided to have an “oral sex party”. We felt creative and made up a card game that allowed us to test the luck of the draw. ~Card game rules at the bottom~ Each number card drawn would result in that amount of minutes of oral play performed on the partner, and if a face card was drawn, additional special features could be implemented during that turn, such as toys or fingers. Each turn consisted of drawing a card and pleasuring the other orally until the timer was up. Then switch and repeat until we couldn’t take it anymore and would inevitably fuck. Pretty straight forward.</p> <p>A few turns in, I had only drawn low numbers and was itching to give him longer blowjobs as he was drawing high cards and face cards. I had just drawn a 4 which followed his 8 minute King turn, so I was incredibly turned on and really just wanted to pleasure him as he deserved. I was having the time of my life, and he clearly was too, so I went off script and ignored the 4 minute timer. I kept going deeper and deeper until I was feeling him down my throat. Turned on by my own accomplishments of getting him that far back, I kept deepthroating him and when he told me he was going to cum, in my own enthusiastic dick swallowing vigor, I accidentally jammed him back to the feeling I knew there was no return from. A volcanic surge immediately erupted and I tried my darndest to swallow it back but there was just too much. I pulled back and tried, to catch it in my hands but was unsuccessful and left staring at a brown mess of the ice cream and cum on my white sheets.</p> <p>Luckily my boyfriend is the sweetest ever and after a quick pic*, cleanup, and laundry cycle, we cuddled and enjoyed the rest of the night together.</p> <p>--&gt;After it happened I realized I could reap the sweet karma benefits of my misfortune and decided it was best to gather photo proof of such event. Also was drunk and thought it was a good/funny memory to capture. Albeit disgusting...</p> <p>Because y&#39;all nasty asses wanted to see the <a href=\"https://imgur.com/a/ggWdsSr\">aftermath</a>. It looks like shit so don&#39;t say I didn&#39;t warn you.</p> <p>I guess it&#39;s inevitable with stories like these that end up blowing up to assume it&#39;s made up. Here is the <a href=\"https://imgur.com/a/nqMulPq\">text</a> I sent my bf asking for his approval to post because it doesn&#39;t just involve me, so I wanted to make sure he was comfortable with my sharing first. 3 years together and we continue to work on our communication and keeping each other in the loop. </p> <p>CARD GAME RULES- Shuffle the desk of cards, either use half or full deck. However you&#39;re feeling in the moment. Each player draws a card to flip over simultaneously. Highest card is the giver in the first turn.</p> <p>Alternate drawing cards and going down on each other for the number of minutes you draw on your card. If you draw a face card, these were the special rules. To be changed as is fit for your relationship. Ours were as follows-</p> <p>Jack was either only hands or only mouth for that turn. Queen was the option to add a toy-vibrator for me, plug for him. King was the classic pinky in ass, other fingers in my pussy. Or for him, my finger in his ass, a recent addition to our sexual escapades which I love. Ace was getting to fuck, then going back to oral after that turn.</p> <p>Each face card that was drawn was followed by the drawing of a number to figure out how long that would last.</p> <p>Our rule was no cumming during the game so we could edge as long as possible before the inevitable fuck. That didn&#39;t end up happening past a few rounds...clearly.</p> <p>Thank you for silver x2, kind stranger! Platinum too! And now thank for you gold x3! Many thanks. Will be passing on the wealth in honor of this blunder.</p> <p>TL;DR Sexy times were interrupted when I was giving my bf an enthusiastic bj and vomited chocolate ice cream all over his dick as he was orgasming.</p> </div><!-- SC_ON --> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/chocolateicecreambj\"> /u/chocolateicecreambj </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/tifu/\"> r/tifu </a> <br/> <span><a href=\"https://www.reddit.com/r/tifu/comments/ar1jv7/tifu_deepthroating_my_boyfriend_after_eating/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/tifu/comments/ar1jv7/tifu_deepthroating_my_boyfriend_after_eating/\">[comments]</a></span>",
    "contentSnippet": "As one might think on Valentine’s Day in particular, people like to get up to some frisky business, myself included. After indulging in some post-dinner beer and chocolate ice cream, my boyfriend and I (F) decided to have an “oral sex party”. We felt creative and made up a card game that allowed us to test the luck of the draw. ~Card game rules at the bottom~ Each number card drawn would result in that amount of minutes of oral play performed on the partner, and if a face card was drawn, additional special features could be implemented during that turn, such as toys or fingers. Each turn consisted of drawing a card and pleasuring the other orally until the timer was up. Then switch and repeat until we couldn’t take it anymore and would inevitably fuck. Pretty straight forward. A few turns in, I had only drawn low numbers and was itching to give him longer blowjobs as he was drawing high cards and face cards. I had just drawn a 4 which followed his 8 minute King turn, so I was incredibly turned on and really just wanted to pleasure him as he deserved. I was having the time of my life, and he clearly was too, so I went off script and ignored the 4 minute timer. I kept going deeper and deeper until I was feeling him down my throat. Turned on by my own accomplishments of getting him that far back, I kept deepthroating him and when he told me he was going to cum, in my own enthusiastic dick swallowing vigor, I accidentally jammed him back to the feeling I knew there was no return from. A volcanic surge immediately erupted and I tried my darndest to swallow it back but there was just too much. I pulled back and tried, to catch it in my hands but was unsuccessful and left staring at a brown mess of the ice cream and cum on my white sheets. Luckily my boyfriend is the sweetest ever and after a quick pic*, cleanup, and laundry cycle, we cuddled and enjoyed the rest of the night together. -->After it happened I realized I could reap the sweet karma benefits of my misfortune and decided it was best to gather photo proof of such event. Also was drunk and thought it was a good/funny memory to capture. Albeit disgusting... Because y'all nasty asses wanted to see the aftermath. It looks like shit so don't say I didn't warn you. I guess it's inevitable with stories like these that end up blowing up to assume it's made up. Here is the text I sent my bf asking for his approval to post because it doesn't just involve me, so I wanted to make sure he was comfortable with my sharing first. 3 years together and we continue to work on our communication and keeping each other in the loop.  CARD GAME RULES- Shuffle the desk of cards, either use half or full deck. However you're feeling in the moment. Each player draws a card to flip over simultaneously. Highest card is the giver in the first turn. Alternate drawing cards and going down on each other for the number of minutes you draw on your card. If you draw a face card, these were the special rules. To be changed as is fit for your relationship. Ours were as follows- Jack was either only hands or only mouth for that turn. Queen was the option to add a toy-vibrator for me, plug for him. King was the classic pinky in ass, other fingers in my pussy. Or for him, my finger in his ass, a recent addition to our sexual escapades which I love. Ace was getting to fuck, then going back to oral after that turn. Each face card that was drawn was followed by the drawing of a number to figure out how long that would last. Our rule was no cumming during the game so we could edge as long as possible before the inevitable fuck. That didn't end up happening past a few rounds...clearly. Thank you for silver x2, kind stranger! Platinum too! And now thank for you gold x3! Many thanks. Will be passing on the wealth in honor of this blunder. TL;DR Sexy times were interrupted when I was giving my bf an enthusiastic bj and vomited chocolate ice cream all over his dick as he was orgasming.    submitted by    /u/chocolateicecreambj    to    r/tifu   [link]   [comments]",
    "id": "t3_ar1jv7",
    "isoDate": "2019-02-15T21:32:47.000Z"
  }
];


const reducer = (state, action) => {
      return state;  
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));


class App extends React.Component {
	render() {
		return (
			<div className="wrapper">
					<Header />
					<Navigation/>
					<Main/>
					<Footer/>
					<Bottom/>
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);