# FormValidations
This plugin helps to validate  form fields.

With this plugin you can check if form field value is changed or not by checking if field has 'touched-warning' class. You can check if field has error by checking '.error-field' class. Error messages are displayed just below the field and are shown under '.reference-text' class. 

You can apply this plugin to particular form by giving form ID as argument when calling, for example '#form1'. If you want to apply to all input fields in the web page then don't pass any arguments to the plugin.

This plugin will also take care of disabling submit form button if there are any errors.

Following fields can be validated with this plugin:
1. SSN
2. Number
3. Minimum length
4. Only Characters field
5. Maximum length
6. Integer field
7. USA Zip code 
8. USA Phone number
9. Email field
10. TIN
11. Blank value
12. Only greater than 0 value
13. City field
14. HTML Select field for blank value

To use this plugin include form.validate.js and form.validate.css file in your web page. Once the page is loaded call the plugin. 

Please take a look at index.html page for reference.

Screenshots:

![alt text](https://github.com/nagarwa2/jQuery-Form-Validations-Plugin/blob/master/1.png)

![alt text](https://github.com/nagarwa2/jQuery-Form-Validations-Plugin/blob/master/2.png)

 
