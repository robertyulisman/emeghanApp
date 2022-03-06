import React from 'react';
import {View, Text} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Warna} from '../../utils/Data';

const RatingDefault = ({rating, style, review}) => {
  return (
    <View style={[{flexDirection: 'row'}, style]}>
      {rating && (
        <StarRating
          disabled={false}
          maxStars={1}
          rating={rating}
          fullStarColor={'orange'}
          starSize={17}
          // selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
      )}
      <Text
        style={{
          color: Warna.grayscale.dua,
          marginLeft: 10,
          fontFamily: 'Nunito-Regular',
        }}>
        ({review} review)
      </Text>
    </View>
  );
};

export default RatingDefault;
