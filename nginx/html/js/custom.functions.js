function customAudEq(elem) {
  var tBody = elem.parentNode;
  while (tBody.nodeName != "TBODY") tBody = tBody.parentNode;
  for (var x = 0; x < tBody.rows.length; x++) {
    var tBrc0 = tBody.rows[x].cells[0];
    var tBrc1 = tBody.rows[x].cells[1];
    switch (elem.value) {
      case "parametric":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(20 to 20000)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20000, Math.max(20, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(5 to 150)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(150, Math.max(5, parseInt(input.value) || 0));
            break;
          case "filterGain":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(-30 to 20)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20, Math.max(-30, parseInt(input.value) || 0));
            break;
        }
        break;
      case "lowShelf":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(20 to 3000)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(3000, Math.max(20, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
          case "filterGain":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(-30 to 20)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20, Math.max(-30, parseInt(input.value) || 0));
            break;
          }
          break;
      case "highShelf":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(1000 to 20000)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20000, Math.max(1000, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
          case "filterGain":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(-30 to 20)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20, Math.max(-30, parseInt(input.value) || 0));
            break;
          }
        break;
      case "notch":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(10 to 20000)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20000, Math.max(10, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(5 to 150)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(150, Math.max(5, parseInt(input.value) || 0));
            break;
          case "filterGain":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
          }
        break;
      case "lowCut":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(10 to 200)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(200, Math.max(10, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
          case "filterGain":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
        }
        break;
      case "highCut":
        switch (tBrc0.className) {
          case "filterFrequency":
            tBrc0.style.color = "#000000";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "(10000 to 20000)";
            var input = tBrc1.getElementsByTagName('input')[0];
                input.disabled = "";
                input.value = Math.min(20000, Math.max(10000, parseInt(input.value) || 0));
            break;
          case "filterQ":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
          case "filterGain":
            tBrc0.style.color = "#999999";
            tBrc1.getElementsByTagName('span')[0].firstChild.nodeValue = "";
            tBrc1.getElementsByTagName('input')[0].disabled = "disabled";
            break;
        }
        break;
    }
  }
}


/*
function testPatternFilter(elem) {
  var table = elem.parentNode;
  while (table.nodeName != "TABLE") table = table.parentNode;
  for (var x = 0; x < table.rows.length; x++) {
    if (table.rows[x].cells[0].className == "testGenPattern") {
      var select = table.rows[x].cells[1].getElementsByTagName('select')[0], oldValue = select.value;
      select.style.display = "none";
      while (select.firstChild) select.removeChild(select.firstChild);
      for (var y = 0, si = 0; y < testPatterns.length; y++) {
        if (testPatterns[y][elem.value]) {
          var option = document.createElement('option');
              option.value = testPatterns[y].value;
              option.appendChild(document.createTextNode(testPatterns[y].name));
            select.appendChild(option);
          if (testPatterns[y].value == oldValue) si = y;
        }
      } select.value = (si) ? oldValue : select.options[0].value;
      select.style.display = "inline";
      break;
    }
  }
}
*/
