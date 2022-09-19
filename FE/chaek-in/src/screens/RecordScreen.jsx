import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

function RecordScreen() {
  return (
    <View style={styles.container}>
      <StyledButton type='primary'>test Button</StyledButton>
      <Text>독후활동입니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StyledButton = styled.Text`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: 'skyblue';
`;

export default RecordScreen;
