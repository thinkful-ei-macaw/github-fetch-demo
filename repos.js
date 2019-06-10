'use strict';

const getRepos = function() {
  try {
    fetch('https://api.github.com/users/andreacardybailey/repos')
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
        extractData(jsonData);
      });
  }
  catch(error){
    console.log(`There was an error fetching your data: ${error.message}.`);
  }
};

const extractData = function(jsonData) {
  jsonData.forEach(repo => {
    let {
      name,
      html_url,
      created_at,
      description,
    } = repo;
    let dateCreated = new Date(created_at);
    $('.repos').append(createTemplate(name, html_url, description, dateCreated));
  });
};

const createTemplate = function(name, html_url, description, dateCreated) {
  let template = 
    `<section>
      <h2><a href="${html_url}" target="_blank">${name}</a></h2>
      <ul>
        <li>Description: ${description}</li>
        <li>Date created: ${dateCreated.getMonth()}/${dateCreated.getDate()}/${dateCreated.getFullYear()}</li>
      </ul>
    </section>
    `;
  return template;
};

$(getRepos);