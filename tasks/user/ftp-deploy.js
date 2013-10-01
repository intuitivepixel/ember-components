module.exports = {
  // The ftp-deploy tasks happen at the very final uploading everything
  // from the public directory to the remote server
  //

  dist: {
    auth: {
      host: 'www.andrea-daquino.com',
      port: 21,
      authKey: 'key1'
    },
    src: ['tmp/public', 'tmp/javascript'],
    dest: 'domains/ember-components/www',
    exclusions: ['tmp/public/**/.DS_Store', 'tmp/javascript/**/.DS_Store']
  }
};
