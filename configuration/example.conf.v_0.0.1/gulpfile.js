import Config from "./config";

let dirbase = './../../../';
let DIST_FOLDER = dirbase + Config.getPathBuild;
let DIST_FOLDER_ASSETS = dirbase + Config.getPathResources;
let SOURCE_FOLDER = dirbase + Config.getPathCss;
let SOURCE_FOLDER_VIEWS = dirbase + Config.getPathResources;
let SOURCE_FOLDER_es6 = dirbase + Config.getPathJS;
let version = new Date();

const mjml = require('gulp-mjml');


const {src, dest, watch, series, parallel} = require('gulp');

const spritesmith = require('gulp.spritesmith');
const image = require('gulp-image');
const twig = require('gulp-twig');
const data = require('gulp-data');
const mjmlEngine = require('mjml');

function compress_image(inputlinkForImage, outputlinkForImage, done) {
    var spriteData = src(linkForImage)
      .pipe(image(
        {
            pngquant: true,
            optipng: true,
        }
        ),
        dest(outputlinkForImage)
      );
    done();
}

async function create_sprite(inputPathForImage, outputPathForSprite, outputPathInSass, outputPathForScss ,fileName) {
    var spriteData = src(inputPathForImage)
      .pipe(spritesmith({
          imgName: fileName+'.png',
          imgPath: outputPathInSass + fileName + '.png' + '?' + version.getTime(),
          cssName: fileName+'.scss',
          cssFormat: 'scss',
          algorithm: 'binary-tree',
      }));
    spriteData.css.pipe(dest(outputPathForScss));
    spriteData.img.pipe(dest(outputPathForSprite));
    
}

async function createEmail() {
    var spriteData = src(SOURCE_FOLDER_VIEWS+'twig/Emails/src/*.mjml')
        .pipe(mjml(mjmlEngine, {validationLevel: 'strict'}))
        .pipe(dest(function(file) {
                file.basename = file.basename.split( '.' )[0] + '.html.twig';
                return SOURCE_FOLDER_VIEWS+'twig/Emails/dist/';

            })
        );
}



async function sprite_main() {
    let spriteName = "spriteBase";
   await create_sprite(SOURCE_FOLDER_VIEWS+"assets/images/sprite_base/*.png", SOURCE_FOLDER_VIEWS+"assets/images/", "./../../assets/images/", SOURCE_FOLDER_VIEWS+"css/Commponent/",  spriteName)
}

function buildEmail() {
    return src(SOURCE_FOLDER_VIEWS+'twig/Emails/*.twig')
      
      .pipe(twig({
            debug: true,
            data: {
                  title: 'Gulp and Twig',
                  benefits: [
                      'Fast',
                      'Flexible',
                      'Secure'
                  ]
              },
            filters: [
                {
                    name: "length",
                    func: function (args) {
                        return "0";
                    }
                }
            ],
        
    }
      ))
      .pipe(dest(SOURCE_FOLDER_VIEWS+'twig/Emails/not_follow_me/'));
    
}



exports.createSprite = series(
  sprite_main
);

exports.mjmlCreateMails = series(
    createEmail
);
