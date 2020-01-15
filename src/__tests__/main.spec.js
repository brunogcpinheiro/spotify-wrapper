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
    it('should call fetch function', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });
  });
});
