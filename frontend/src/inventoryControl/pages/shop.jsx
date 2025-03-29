import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Badge,
  IconButton,
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Shop() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/inventoryPanel');
      const json = await response.json();
      if (response.ok) setItems(json);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const response = await fetch('/cart');
      const cartItems = await response.json();
      if (response.ok) setCartCount(cartItems.length);
    };
    fetchCartCount();
  }, [cartCount]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* App Bar with Cart Icon */}
      <AppBar position="static" color="default" sx={{ mb: 3, backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: 'green', flexGrow: 1, textAlign: 'center' }}
          >
            🌱 GreenLink Store 🛒
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search Items"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Item Grid */}
      <Grid container spacing={3}>
        {items
          .filter((item) =>
            query === '' ? true : item.itemName.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.itemID}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(`/item/${item.itemID}`)}>
                  <CardMedia
                    component="img"

                    height="50%"
                    width="50%"
                    image={item.imgURL}
                    alt={item.itemName}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" textAlign="center">
                      {item.itemName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Shop;
