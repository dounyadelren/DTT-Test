# DTT-Test
This repo is holding a technical assignment part of a recruitment process for a company called DTT.

<h2>The assessment</h2>
<p>DTT challenged me to create a web application for house listings, which allows the user to view a list of houses that are currently available for sale, and create, edit and delete their own listings following a design file provided for desktop and mobile.</p>

<h2>Recommandations</h2>
<p>They didn't really gave a deadline, although they adivsed to complete the assignment within 30 hours. However it was mandatory to use <strong>VueJS, Pinia as a store management and no CSS libraries were allowed</strong></p>
<p>I personnally chose to use Vue 3.</p>

<h2>Technical aspects</h2>
<p>DTT provided a link with the API documentation <a href="https://documenter.getpostman.com/view/12962311/2s93m4WhXN#85344c71-e504-4432-a2e9-349b9941f269">here</a>, they also gave me a personal API Key that I will not display in this repository. They recommended to set the localhost port to 8080.</p>

<h2>User stories</h2>
<p>As for the user stories, DTT asked for basic CRUD features (create listing, retrieve information, edit listing, delete listing)</p>

<h2>Positive aspects</h2>
<p>They found my webapp very well structured, every recommandation was respected.</p>
<i>"The Vue component hierarchy / tree is done well, the usage of Vue Router and Pinia is also well done. The project folder structure follows common Vue structure"</i>

<h2>Issues</h2>
<ul>
  <li><p>My main issue was the image uploading for the listings, my binary data wasn't send to the server at all and I couldn't figure out why.</p></li>
  <li><p>Also, the "Recommended for you" section: the recommend houses are not clickable, not even on the image</p></li>
  <li><p>The delete listing modal cannot be reopened if you close it</p></li>
  <li><p>Some of the API calls are made on the OnMounted hook, which they admit not a good practice as I could have preloaded the data before charging the page (with a     OnBeforeRouteEnter). This hook doesn't work with the Vue syntax I chose (<code>script setup</code>)</p>
  </li>
</ul>
