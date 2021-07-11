let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let artist = document.querySelector('#artist');
let mute_volume = document.querySelector('#volume_mute_problem');
let autoPlayIcon = document.querySelector('#autoPlayIcon');
let bottom_bar = document.querySelector('#bottom_bar');
let bottomBarPlay = document.querySelector('#bottomBarPlay');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;
let change_volume_icon = false;
// create a audio element 
let track = document.createElement('audio');


// all song list one start
let All_song = [
    {
        name: "It's You",
        path: 'audio/song2.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Ali Gatie"
    },
    {
        name: 'Should I Stay or Should I Go',
        path: 'audio/song4.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "The Clash"
    },
    {
        name: 'Odhora',
        path: 'audio/song5.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Vibe"
    },

];


let top_eight = [ 
    {
        name: 'singer-1',
        path: 'audio/popSong1.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "RITVIZ"
    },
    {
        name: 'No Woman, No Cry',
        path: 'audio/popSong2.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Bob Marley"
    },
    {
        name: 'Is This Love',
        path: 'audio/popSong3.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Bob Marley"
    },
    {
        name: 'No más',
        path: 'audio/popSong4.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Arabe El De La Clave"
    },
    {
        name: 'New Rules',
        path: 'audio/popSong5.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "Dua Lipa"
    },
    {
        name: 'sixth song',
        path: 'audio/popSong6.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "sixth singer"
    },
    {
        name: 'seven song',
        path: 'audio/popSong7.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "seven singer"
    },
    {
        name: 'eight song',
        path: 'audio/popSong8.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "eight singer"
    },
    {
        name: 'nine song',
        path: 'audio/popSong9.mp3',
        img: 'images/player_two_images/image-1.jpg',
        singer: "nine singer"
    }
];
// all song list one End


// all function start

// load function start
function load_track(index_no){
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    timer = setInterval(range_slider , 1000);
    track.load();
}
load_track(index_no);


function pushArray(rootArr, subArr) {
    var subArrLen = subArr.length;
    
    for ( var i = 0; i <= subArrLen-1; i++ ) {
        // rootArr.push(subArr[i]);
        rootArr[i] = subArr[i];
    }
}




function nextSong(){
    pushArray(All_song, top_eight);
    justplay();
}





function justplay(){
    if(playing_song == false){
        playsong();
    }
    else{
        pausesong();
    }
    bottom_bar.style.display = "inline-block"
}
function playsong(){
    pushArray(top_eight, All_song);
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
    bottomBarPlay.innerHTML = '<i class="fa fa-pause playbtnStyle"></i>';
}
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
    bottomBarPlay.innerHTML = '<i class="fa fa-play playbtnStyle"></i>'

}
// load function End

// next song start
function next_song(){
    if(index_no < All_song.length -1){
        index_no = index_no +1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}
// next song End

// previus part start
function previous_song(){
    if(index_no > 0){
        index_no = index_no -1;
        load_track(index_no);
        playsong();
    }
   
    else{
        index_no = All_song.length-1;
        load_track(index_no);
        playsong();
    }
}
// previus part End

// reset slider start
function reset_slider(){
    slider.value = 0;
}
// reset slider End

// volume_change part start
function volume_change(){
    track.volume = recent_volume.value / 100;

}


// i make this start
function mute_sound(){
    if(change_volume_icon == false){
        mute_problem();
    }
    else{
        change_volume_icon = false;
        mute_volume.innerHTML = '<i class="fa fa-volume-up"></i>';
        volume_change();
    }
    
}
function mute_problem(){
    change_volume_icon = true;
    track.volume = recent_volume.value - recent_volume.value;
    mute_volume.innerHTML = '<i class="fa fa-volume-off"></i>';
}
// i make this End













// volume_change part End

// auto play function start


function autoplay_switch(){
    if(autoplay == 1){
        autoplay = 0;
        autoPlayIcon.style.color = "#ffffff";
    }
    else{
        autoplay = 1;
        autoPlayIcon.style.color = "#ff8a65";
    }
}



// auto play function End

// change duration part start
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}
function range_slider(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100/track.duration);
        slider.value = position;
    }

    // function will run when song is over


    if(track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if(autoplay == 1){
            index_no = index_no + 1;
            load_track(index_no);
            playsong();
        }
    }
}
// change duration part End



function bottom_bar_play(){
    justplay();
}

// all function End




$('.top_chart_slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 6,
    centerPadding: false,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          dots: false,
          arrows: false,
          centerPadding: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          arrows: false,
          centerPadding: false
        }
      }
    ]
  });





$('.banner_slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1.6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
          centerPadding: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          arrows: false,
          centerPadding: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          centerPadding: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });



