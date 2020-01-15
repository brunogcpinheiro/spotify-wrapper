import chai, { expect } from 'chai';
import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../main';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  //smoke tests
  describe('Smoke Tests', () => {
    it('should exists search function', () => {
      expect(search).to.exist;
    });
    it('should exists searchArtists function', () => {
      expect(searchArtists).to.exist;
    });
    it('should exists searchAlbums function', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exists searchTracks function', () => {
      expect(searchTracks).to.exist;
    });
    it('should exists searchPlaylists function', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach( () => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach( () => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbum = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });
  });
});
