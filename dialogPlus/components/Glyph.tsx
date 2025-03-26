
import { Text } from 'react-native';
import { decode } from 'html-entities';

type glyphProps = {
  code: number;
  size: number;
};

function Glyph({ code, size }: glyphProps) {
  return (
    <Text style={{fontSize: size ? size : 24}}>
      {decode('&#'+String(code)+';')}
    </Text>
  )
}   

export default Glyph;
