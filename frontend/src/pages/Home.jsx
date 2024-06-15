import React, { useEffect, useState } from 'react'
import '../screen.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Grid, Box } from '@mui/material'
import Sidebar from '../components/SidebarA';
import { Link } from 'react-router-dom';

const AlbumsDetailsOne = ({ albumId }) => {
  const profileStyle = { color: 'white', backgroundColor: '#000000', padding: '12px 16px', cursor: 'pointer', borderRadius: '20px', marginLeft: 'auto', order: 2 }
  const headerStyle = { color: 'white', }
  const [albums, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/search/albums?q=${albumId}`);
        const data = await response.json();
        setAlbum(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [albumId]);
  if (!albums) return <div>Loading...</div>;
  return (
    <div style={{ background: '#282424' }}>
      <Sidebar/>
      <div className="leftBody" style={{ marginRight: '20px', color: 'white' }}>
        <div style={{ display: 'flex' }}>
          {/* <select style={profileStyle}>
          <option disabled selected value> Profile name </option>
          <option value="fr">French</option>
          </select> */}
          <div style={{ paddingTop: '48px' }}>
            <Link to={`/`} style={{ paddingRight: '20px' }}>Playlists</Link>
            <Link to={`/`} style={{ paddingRight: '20px' }}>Podcasts</Link>
            <Link to={`/`} style={{ paddingRight: '20px' }}>Artist</Link>
            <Link to={`/`} style={{ paddingRight: '20px' }}>Albums</Link>
          </div>
        </div>
        <div style={{ paddingTop: '40px' }}>
          <Grid container spacing={2}>
            {albums.map(album => (

              <Grid item xs={2}>
                <div key={album.id}>
                  <Card sx={{ maxWidth: 200 }} style={{ backgroundColor: "#100c0c", color: 'white' }}>
                    <Link to={`/album/${album.id}`}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="10"
                          image={album.images[0].url}
                          alt={album.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {album.name}
                          </Typography>
                          <Typography variant="body2" color="grey">
                            {album.artists.map(artist => artist.name)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions style={{ backgroundColor: "black" }}>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </Grid>

            ))}
          </Grid>
        </div>
      </div>
    </div>

  )
}

const Home = () => {
  return (
    <div>
      <AlbumsDetailsOne albumId="Songs About Jane" />
    </div>
  );
};

export default Home