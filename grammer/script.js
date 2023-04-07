function checkGrammar() {
    var input = document.getElementById("input").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.grammarbot.io/v2/check");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var response = JSON.parse(this.responseText);
        var output = document.getElementById("output");
        output.innerHTML = "";
        for (var i = 0; i < response.matches.length; i++) {
          var match = response.matches[i];
          var message = match.message;
          var replacements = match.replacements;
          var offset = match.offset;
          var length = match.length;
          var context = input.substring(offset, offset + length);
          var suggestion = "";
          if (replacements.length > 0) {
            suggestion = " (Did you mean '" + replacements[0].value + "'?)";
          }
          output.innerHTML += "<p>" + message + " - " + context + suggestion + "</p>";
        }
      }
    };
    xhr.send(JSON.stringify({
      "text": input,
      "language": "en-US",
      "enabledCategories": ["grammar"]
    }));
  }
  