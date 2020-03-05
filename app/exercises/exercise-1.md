# Exercise 1

1. Create a configuration file. The file should have configuration data for these two items:

- port number
- name of the default file, 'index.html'

2. When the application first runs, load the configuration (you can name the file whatever you want), and use the values from it to configure the web application

3. The configuration file should be stored in a JSON format.

Bonus:

4. Log each request to the server to a log file recording the date/time and the requested URL

https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_clientrequest

https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback

writeFile... think about what log is doing in terms of appending... and see if writeFile is correct to use of if there another function which is similar that may be more appropriate