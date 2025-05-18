#How It Works
#Set a starting point for the lightning line

Usually starts from the top of the screen.

#Draw lightning by updating the point repeatedly

X is updated randomly by -20 to +20 to create a zigzag.

Y is increased by about +40 to move the line downward.

Keep connecting new points like this multiple times to form a bolt.

#Call this drawing method every 2 seconds, but:

Add a Math.random() check so it only runs sometimes.

This gives a natural, random storm effect.

#Flicker effect

Occasionally draw the lightning again after a very short delay (e.g., 50ms) using the same starting point.

Even from the same position, each bolt looks different due to randomness.

#Clear the screen

Clear the canvas right after drawing, or shortly after.

Makes each lightning bolt flash and disappear, like real thunder.