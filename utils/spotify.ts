import type { SpotifyTrack, SpotifyPlaylist } from '../types/spotify';

const getAccessToken = async (): Promise<string> => {
  const authorization = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID ?? ''}:${
      process.env.SPOTIFY_CLIENT_SECRET ?? ''
    }`
  ).toString('base64');
  const grant = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const { access_token } = (await grant.json()) as { access_token: string };

  return access_token;
};

export const getPlaylist = async (
  id: string
): Promise<{
  data: SpotifyPlaylist;
  tracks: SpotifyTrack[];
}> => {
  const access_token = await getAccessToken();

  const tracksRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { items } = (await tracksRequest.json()) as {
    items: SpotifyTrack[];
  };

  const playlistRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const playlist = (await playlistRequest.json()) as SpotifyPlaylist;

  return {
    data: playlist,
    tracks: items,
  };
};
