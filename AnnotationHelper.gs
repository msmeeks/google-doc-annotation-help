/**
 * AnnotationHelper helps to manage inline, manual annotations.
 *
 * Features:
 *   1. Convert any matching annotations in the form [a], [ab], [a1], [ab123] to sequentially numeric annotations in the form [1], [2], [3]...
 *      See convertAnnotations() for more details.
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Convert Annotations', 'convertAnnotations')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Convert annotations in the form [a] [ab] [a1] [ab12] to sequentially numeric annotations in the form [1].
 *
 * Run from the Add-Ons > Annotation Helper > Convert Annotations menu item.
 *
 * Example:
 *   Here is some text with an annotation [a]. And some more text with another annotation [b].
 *   [a] - some note.
 *   [b] - another note.
 *
 *   Here is even more text with some more complex annotations [ab][c1][ab2][c1234]
 *   [ab] - note ab
 *   [c1] - note c1
 *   [ab2] - note ab2
 *   [c1234] - note c1234
 *
 * Result after conversion:
 *   Here is some text with an annotation [1]. And some more text with another annotation [2].
 *   [1] - some note.
 *   [2] - another note.
 *
 *   Here is even more text with some more complex annotations [3][4][5][6]
 *   [3] - note ab
 *   [4] - note c1
 *   [5] - note ab2
 *   [6] - note c1234
 *
 */
function convertAnnotations() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  // Escape slashes so they will be included in the pattern
  var annotationPattern = "\\[[a-z][a-z]?\\d*\\]";
  
  var annotationToUpdateElement = body.findText(annotationPattern);
  var index = 0;
  while (annotationToUpdateElement) {
    var elementText = annotationToUpdateElement.getElement().asText().getText();
    // Get the annotation text without the brackets
    var annotationToUpdateText = elementText.slice(annotationToUpdateElement.getStartOffset() + 1, annotationToUpdateElement.getEndOffsetInclusive());
    // Add escaped brackets to ensure that the brackets themselves are included in the replace pattern
    annotationToUpdateText = '\\[' + annotationToUpdateText + '\\]';

    index++;
    var newAnnotation = '[' + index + ']';
    body.replaceText(annotationToUpdateText, newAnnotation)
    
    annotationToUpdateElement = body.findText(annotationPattern, annotationToUpdateElement);
  }
}
