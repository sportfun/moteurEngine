'use strict';

let THREE = require('three');

import { logError } from '../src/Utils.js';

class Audio {
    constructor() {
        this.audioLoader = new THREE.AudioLoader();
        this.masterVolume = 1.0;
        this.defaultLoop = true;
        this.defaultPlayOnLoad = true;
        this.defaultRefDistance = 20;
    }

    // Create an audio listener and return it
    CreateAudioListener() {
        return (new THREE.AudioListener());
    }

    // param: string, THREE.audioListener, (optional)boolean, (optional)number, (optional)boolean
    // Create a sound from the file passed in arguments for the audio listener passed in arguments
    CreateSound(filePath, audioListener, looped, specialVolume, playOnLoad) {
        if (typeof filePath === 'undefined') {
            logError('Audio::Play: \'filePath\' is undefined');
            return;
        }
        if (typeof audioListener === 'undefined') {
            logError('Audio::Play: \'audioListener\' is undefined');
            return;
        }
        let loop = this.defaultLoop;
        if (typeof looped !== 'undefined') {
            loop = looped;
        }
        let volume = this.masterVolume;
        if (typeof specialVolume !== 'undefined') {
            volume = specialVolume;
        }
        let play = this.defaultPlayOnLoad;
        if (typeof playOnLoad !== 'undefined') {
            play = playOnLoad;
        }
        let audio = new THREE.Audio(audioListener);
        this.audioLoader.load(filePath, buffer => this.OnLoadAudioComplete(audio, buffer, loop, volume, play), xhr => this.OnLoadAudioProgress(xhr), xhr => this.OnLoadAudioError(xhr, filePath));
        return (audio);
    }

    // param: string, THREE.audioListener, (optional)number, (optional)boolean, (optional)number, (optional)boolean
    // Create a positinal sound from the file passed in arguments for the audio listener passed in arguments
    CreatePositionalSound(filePath, audioListener, refDistance, looped, specialVolume, playOnLoad) {
        if (typeof filePath === 'undefined') {
            logError('Audio::Play: \'filePath\' is undefined');
            return;
        }
        if (typeof audioListener === 'undefined') {
            logError('Audio::Play: \'audioListener\' is undefined');
            return;
        }
        let loop = this.defaultLoop;
        if (typeof looped !== 'undefined') {
            loop = looped;
        }
        let volume = this.masterVolume;
        if (typeof specialVolume !== 'undefined') {
            volume = specialVolume;
        }
        let play = this.defaultPlayOnLoad;
        if (typeof playOnLoad !== 'undefined') {
            play = playOnLoad;
        }
        let distance = this.defaultRefDistance;
        if (typeof refDistance !== 'undefined') {
            distance = refDistance;
        }
        let audio = new THREE.PositionalAudio(audioListener);
        this.audioLoader.load(filePath, buffer => this.OnLoadPositionalAudioComplete(audio, buffer, distance, loop, volume, play), xhr => this.OnLoadAudioProgress(xhr), xhr => this.OnLoadAudioError(xhr, filePath));
        return (audio);
    }

    OnLoadAudioComplete(audio, buffer, looped, volume, play) {
        audio.setBuffer(buffer);
        audio.setLoop(looped);
        audio.setVolume(volume);
        if (play) {
            audio.play();
        }
    }

    OnLoadPositionalAudioComplete(audio, buffer, refDistance, looped, volume, play) {
        audio.setBuffer(buffer);
        audio.setLoop(looped);
        audio.setVolume(volume);
        audio.setRefDistance(refDistance);
        if (play) {
            audio.play();
        }
    }

    // eslint-disable-next-line no-unused-vars
    OnLoadAudioProgress(xhr) {

    }

    // eslint-disable-next-line no-unused-vars
    OnLoadAudioError(xhr, filePath) {
        logError('Audio::OnLoadAudioError: error loading \'filePath\' (' + filePath + ')');
    }
}

export default Audio;
