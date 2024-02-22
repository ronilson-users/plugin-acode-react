/*
Construção de Snippets para REACT NATIVE

*/

export const snippets = [
	{
		prefix: 'imr-import-React',
		snippet: "import React from 'react'",
		type: 'snippet RN',
		description: 'Import React in React Native',
	},

	{
		prefix: 'im-import',
		snippet: "import { $1 } from 'react-native'",
		type: 'snippet RN',
		description: 'Import React Native',
	},

	//imort
	{
		prefix: 'imc-import-components',
		snippet: `import { View, Text, StyleSheet } from 'react-native'`,
		type: 'snippet RN',
		description: 'Import View, Text, StyleSheet components in React Native',
	},
	//ExportDefaultFunctionWithFragment
	{
		prefix: 'rn-export-def-fragment',
		snippet: `export default function $1() {
    return (
      <>
        $2
      </>
    );
  }`,
		type: 'snippet RN',
		description: 'Exportar padrão uma função com retorno de fragmento em React Native',
	},

	{
		prefix: 'rn-export-default',
		snippet: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App\$1() {
  const styles = StyleSheet.create({
    container: {
      // Estilos aqui
    },
  });

  return (
    <View style={styles.container}>
      {/* Conteúdo da View aqui */}
    </View>
  );
}`,

		type: 'snippet RN',
	},

	{
		prefix: 'rn-functional-component',
		snippet: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const $1 = () => {
return (
<View style={styles.container}>
<Text>Seu Texto</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
// Estilos para o container
},
});

export default $1;`,
		type: 'snippet RN',
		description: 'Snippet para um componente funcional em React Native',
	},

	{
		prefix: 'rn-constant',
		snippet: 'const $1name = $2 method_name',
		type: 'snippet RN',
		description: 'Criação de constante em React Native',
	},

	{
		prefix: 'Button',
		snippet: `<Button\ntitle="$1" \nonPress={()=>{\n$2}} />`,
		type: 'snippet RN',
		description: 'Snippet para um componente de botão em React Native',
	},

	/*
  logs
  */

	// Log simples
	{
		prefix: 'clg',
		snippet: 'console.log($1);',
		type: 'snippet log',
		description: 'Log simples no console',
	},
	// Log com formatação de string
	{
		prefix: 'clg-f',
		snippet: 'console.log(`$1:`, $1);',
		type: 'log',
		description: 'Log com formatação de string no console',
	},
	// Log de objeto
	{
		prefix: 'clg-o',
		snippet: "console.log('$1', $1);",
		type: 'snippet log',
		description: 'Log de objeto no console',
	},
	// Log de erro
	{
		prefix: 'clg-e',
		snippet: 'console.error($1);',
		type: 'log',
		description: 'Log de erro no console',
	},
	// Log de aviso
	{
		prefix: 'clg-w',
		snippet: 'console.warn($1);',
		type: 'snippet log',
		description: 'Log de aviso no console',
	},
	// Log de informações
	{
		prefix: 'clg-i',
		snippet: 'console.info($1);',
		type: 'log',
		description: 'Log de informações no console',
	},
	// Log de tempo
	{
		prefix: 'clg-t',
		snippet: "console.time('$1');\n$2\nconsole.timeEnd('$1');",
		type: 'snippet log',
		description: 'Log de tempo no console',
	},

	// Log de tabela para array de objetos
	{
		prefix: 'clg-tb',
		snippet: 'console.table($1);',
		type: 'snippet log',
		description: 'Log de tabela no console para array de objetos',
	},

	// javascript
	{
		prefix: 'obj-propriedades',
		snippet: `const $1 = {
  nome: 'String',
  idade: 0,
};`,
		type: 'snippet RN',
		description: 'Criar um objeto JavaScript com propriedades padrão',
	},

	{
		prefix: 'arrow-function',
		snippet: 'const $1 = ($2) => {\n  $3\n};',
		type: 'snippet RN',
		description: 'Criar uma função arrow com parâmetros',
	},

	{
		prefix: 'map-function',
		snippet: 'const ${1:transformedArray} = ${2:array}.map((${3:item}) => {\n  $4\n});',
		type: 'snippet RN',
		description: 'Criar uma função map em JavaScript',
	},

	{
		prefix: 'conpersona',
		snippet: "const ${1:Persona} = {\n  name: 'String',\n  idade: 0,\n};",
		type: 'snippet RN',
		description: 'Snippet para criar um objeto em JavaScript',
	},

	{
		prefix: 'ternary-operator',
		snippet: 'const $1 = $2 ? $3 : $4;',
		type: 'snippet RN',
		description: 'Criar um operador ternário em JavaScript',
	},

	{
		prefix: 'try-catch-block',
		snippet: 'try {\n  $1\n} catch (error) {\n  $2\n}',
		type: 'snippet RN',
		description: 'Criar um bloco try-catch em JavaScript',
	},
	// import
	{
		prefix: 'im-import-image',
		snippet: "import { Image } from 'react-native'",
		type: 'snippet RN',
		description: 'Importar componente Image em React Native',
	},

	{
		prefix: 'im-import-scrollview',
		snippet: "import { ScrollView } from 'react-native'",
		type: 'snippet RN',
		description: 'Importar componente ScrollView em React Native',
	},

	{
		prefix: 'im-import-flatlist',
		snippet: "import { FlatList } from 'react-native'",
		type: 'snippet RN',
		description: 'Importar componente FlatList em React Native',
	},
	// Estilos e Layout
	{
		prefix: 'im-import-styles',
		snippet: "import { StyleSheet } from 'react-native'",
		type: 'snippet RN',
		description: 'Importar StyleSheet em React Native',
	},

	{
		prefix: 'rn-styles-object',
		snippet: `const styles = StyleSheet.create({
$1: {
// Estilos aqui
},
});`,
		type: 'snippet RN',
		description: 'Criar objeto de estilos básico',
	},
	// Navegação
	{
		prefix: 'im-import-navigation',
		snippet: "import { NavigationContainer } from '@react-navigation/native';",
		type: 'snippet RN',
		description: 'Importar biblioteca de navegação em React Native',
	},

	{
		prefix: 'rn-stack-navigation',
		snippet: `const Stack = createStackNavigator();

function App() {
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="$1" component={$2} />
</Stack.Navigator>
</NavigationContainer>
);
}`,
		type: 'snippet RN',
		description: 'Criar estrutura básica de navegação em pilha',
	},

	// Hooks

	// ReactNativeImportStateEffect
	{
		prefix: 'im-import-state-effect',
		snippet: "import { useState, useEffect } from 'react-native';",
		type: 'snippet RN',
		description: 'Importar useState e useEffect do react-native',
	},

	{
		prefix: 'rn-usestate-hook',
		snippet: 'const [$1, set$2] = useState($3);',
		type: 'snippet RN',
		description: 'Criar um snippet para o hook useState',
	},

	{
		prefix: 'rn-useeffect-hook',
		snippet: 'useEffect(() => { $1 \n \n }, [$2]);',
		type: 'snippet RN',
		description: 'Criar um snippet para o hook useEffect',
	},
	// Componentes Personalizados
	{
		prefix: 'rn-custom-component',
		snippet: `const $1 = () => {
return (
<View>
{/* Seu componente personalizado aqui */}
</View>
);
};`,
		type: 'snippet RN',
		description: 'Criar um snippet para um componente personalizado',
	},
	// ReactNativeStyleSnippet
	{
		prefix: 'style',
		snippet: 'style={styles.$1}',
		type: 'snippet RN',
		description: 'Adicionar estilo React Native usando StyleSheet',
	},

	{
		prefix: 'rn-custom-styles',
		snippet: `const styles = StyleSheet.create({
$1: {
// Seus estilos personalizados aqui
},
});`,
		type: 'snippet RN',
		description: 'Adicionar um snippet para estilos personalizados',
	},
	// Requisições Assíncronas
	{
		prefix: 'rn-fetch-request',
		snippet: `fetch('$1')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));`,
		type: 'snippet RN',
		description: 'Criar um snippet para fazer uma requisição usando fetch',
	},
	// Lifecycle Methods
	{
		prefix: 'rn-componentdidmount',
		snippet: 'componentDidMount() { $1 }',
		type: 'snippet RN',
		description: 'Adicionar um snippet para componentDidMount',
	},
	// Testes
	{
		prefix: 'rn-tecase',
		snippet: `test('$1', () => {
// Sua lógica de teste aqui
});`,
		type: 'snippet RN',
		description: 'Criar um snippet para uma estrutura básica de teste',
	},
	// TouchableOpacity
	{
		prefix: 'TouchableOpacity',
		snippet: '<TouchableOpacity onPress={$1}>\n  $2\n</TouchableOpacity>',
		type: 'snippet RN',
		description: 'Criar TouchableOpacity em React Native',
	},
	// SafeAreaView
	{
		prefix: 'SafeAreaView',
		snippet: '<SafeAreaView style={$1}>\n  $2\n</SafeAreaView>',
		type: 'snippet RN',
		description: 'Criar SafeAreaView em React Native',
	},
	// FlatList
	{
		prefix: 'FlatList',
		snippet:
			'<FlatList\n  data={$1}\n  renderItem={({ item }) => ($2)}\n  keyExtractor={(item) => item.id.toString()}\n/>',
		type: 'snippet RN',
		description: 'Criar FlatList em React Native',
	},
	// ScrollView
	{
		prefix: 'ScrollView',
		snippet: '<ScrollView style={$1}>\n  $2\n</ScrollView>',
		type: 'snippet RN',
		description: 'Criar ScrollView em React Native',
	},
	// TextInput
	{
		prefix: 'TextInput',
		snippet: '<TextInput\n  style={$1}\n  onChangeText={(text) => $2}\n  value={$3}\n/>',
		type: 'snippet RN',
		description: 'Criar TextInput em React Native',
	},
	// Pressable
	{
		prefix: 'Pressable',
		snippet: '<Pressable onPress={$1}>\n  $2\n</Pressable>',
		type: 'snippet RN',
		description: 'Criar Pressable em React Native',
	},
	// View
	{
		prefix: 'View',
		snippet: '<View $1>\n  $2\n</View>',
		type: 'snippet RN',
		description: 'Criar View em React Native',
	},

	/* 
  Criar Style para StyleSheet RN
 */

	// alignContent
	{
		prefix: 'alignContent',
		snippet: "alignContent: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo alignContent para um componente',
	},
	// alignItems
	{
		prefix: 'alignItems',
		snippet: "alignItems: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo alignItems para um componente',
	},
	// alignSelf
	{
		prefix: 'alignSelf',
		snippet: "alignSelf: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo alignSelf para um componente',
	},
	// aspectRatio
	{
		prefix: 'aspectRatio',
		snippet: "aspectRatio: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo aspectRatio para um componente',
	},
	// borderBottomWidth
	{
		prefix: 'borderBottomWidth',
		snippet: "borderBottomWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomWidth para um componente',
	},
	// borderLeftWidth
	{
		prefix: 'borderLeftWidth',
		snippet: "borderLeftWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderLeftWidth para um componente',
	},
	// borderRightWidth
	{
		prefix: 'borderRightWidth',
		snippet: "borderRightWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderRightWidth para um componente',
	},
	// borderStartWidth
	{
		prefix: 'borderStartWidth',
		snippet: "borderStartWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderStartWidth para um componente',
	},
	// borderTopWidth
	{
		prefix: 'borderTopWidth',
		snippet: "borderTopWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopWidth para um componente',
	},
	// borderWidth
	{
		prefix: 'borderWidth',
		snippet: "borderWidth: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderWidth para um componente',
	},
	// properties Dev
	{
		prefix: 'pro-style',
		snippet: '$1: { \n $2\n\n},',
		type: 'snippet Dev.',
		description: 'Adicionar estilo nomeSn para um componente',
	},
	// nomeSn
	{
		prefix: 'nomeSn',
		snippet: "nome: '$1',",
		type: 'snippet Dev.',
		description: 'Adicionar estilo nomeSn para um componente',
	},
	// borderEndWidth
	{
		prefix: 'borderEndWidth',
		snippet: 'borderEndWidth: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderEndWidth para um componente',
	},
	// Bottom
	{
		prefix: 'bottom',
		snippet: 'bottom: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo bottom para um componente',
	},
	// Column Gap
	{
		prefix: 'columnGap',
		snippet: 'columnGap: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo columnGap para um componente',
	},
	// Direction
	{
		prefix: 'direction',
		snippet: "direction: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo direction para um componente',
	},
	// Display
	{
		prefix: 'display',
		snippet: "display: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo display para um componente',
	},
	// End
	{
		prefix: 'end',
		snippet: 'end: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo end para um componente',
	},
	// Flex
	{
		prefix: 'flex',
		snippet: 'flex: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo flex para um componente',
	},
	// Flex Basis
	{
		prefix: 'flexBasis',
		snippet: 'flexBasis: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo flexBasis para um componente',
	},
	// Flex Direction
	{
		prefix: 'flexDirection',
		snippet: "flexDirection: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo flexDirection para um componente',
	},
	// Flex Grow
	{
		prefix: 'flexGrow',
		snippet: 'flexGrow: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo flexGrow para um componente',
	},
	// Flex Shrink
	{
		prefix: 'flexShrink',
		snippet: 'flexShrink: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo flexShrink para um componente',
	},
	// Flex Wrap
	{
		prefix: 'flexWrap',
		snippet: "flexWrap: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo flexWrap para um componente',
	},
	// Gap
	{
		prefix: 'gap',
		snippet: 'gap: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo gap para um componente',
	},
	// Height
	{
		prefix: 'height',
		snippet: 'height: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo height para um componente',
	},
	// inset
	{
		prefix: 'inset',
		snippet: 'inset: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo inset para um componente',
	},
	// insetBlockEnd
	{
		prefix: 'insetBlockEnd',
		snippet: 'insetBlockEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo insetBlockEnd para um componente',
	},
	// insetBlockStart
	{
		prefix: 'insetBlockStart',
		snippet: 'insetBlockStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo insetBlockStart para um componente',
	},
	// insetInline
	{
		prefix: 'insetInline',
		snippet: 'insetInline: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo insetInline para um componente',
	},
	// insetInlineEnd
	{
		prefix: 'insetInlineEnd',
		snippet: 'insetInlineEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo insetInlineEnd para um componente',
	},
	// insetInlineStart
	{
		prefix: 'insetInlineStart',
		snippet: 'insetInlineStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo insetInlineStart para um componente',
	},
	// justifyContent
	{
		prefix: 'justifyContent',
		snippet: "justifyContent: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo justifyContent para um componente',
	},
	// left
	{
		prefix: 'left',
		snippet: 'left: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo left para um componente',
	},
	// margin
	{
		prefix: 'margin',
		snippet: 'margin: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo margin para um componente',
	},
	// marginBlock
	{
		prefix: 'marginBlock',
		snippet: 'marginBlock: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginBlock para um componente',
	},
	// Margin Block End
	{
		prefix: 'marginBlockend',
		snippet: 'marginBlockEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginBlockEnd para um componente',
	},
	// Margin Block Start
	{
		prefix: 'marginBlockStart',
		snippet: 'marginBlockStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginBlockStart para um componente',
	},
	// Margin Bottom
	{
		prefix: 'marginBottom',
		snippet: 'marginBottom: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginBottom para um componente',
	},
	// Margin End
	{
		prefix: 'marginEnd',
		snippet: 'marginEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginEnd para um componente',
	},
	// Margin Horizontal
	{
		prefix: 'marginHorizontal',
		snippet: 'marginHorizontal: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginHorizontal para um componente',
	},
	// Margin Inline
	{
		prefix: 'marginInline',
		snippet: 'marginInline: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginInline para um componente',
	},
	// Margin Inline End
	{
		prefix: 'marginInlineEnd',
		snippet: 'marginInlineEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginInlineEnd para um componente',
	},
	// Margin Inline Start
	{
		prefix: 'marginInlineStart',
		snippet: 'marginInlineStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginInlineStart para um componente',
	},
	// Margin Left
	{
		prefix: 'marginLeft',
		snippet: 'marginLeft: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginLeft para um componente',
	},
	// Margin Right
	{
		prefix: 'marginRight',
		snippet: 'marginRight: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginRight para um componente',
	},
	// Margin Start
	{
		prefix: 'marginStart',
		snippet: 'marginStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginStart para um componente',
	},
	// Margin Top
	{
		prefix: 'marginTop',
		snippet: 'marginTop: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginTop para um componente',
	},
	// Margin Vertical
	{
		prefix: 'marginVertical',
		snippet: 'marginVertical: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo marginVertical para um componente',
	},
	// Max Height
	{
		prefix: 'maxHeight',
		snippet: 'maxHeight: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo maxHeight para um componente',
	},
	// Max Width
	{
		prefix: 'maxWidth',
		snippet: 'maxWidth: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo maxWidth para um componente',
	},
	// Min Height
	{
		prefix: 'minHeight',
		snippet: 'minHeight: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo minHeight para um componente',
	},
	// Min Width
	{
		prefix: 'minWidth',
		snippet: 'minWidth: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo minWidth para um componente',
	},
	// Overflow
	{
		prefix: 'overflow',
		snippet: "overflow: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo overflow para um componente',
	},
	// paddingBlock
	{
		prefix: 'paddingBlock',
		snippet: 'paddingBlock: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingBlock para um componente',
	},
	// paddingBlockEnd
	{
		prefix: 'paddingBlockEnd',
		snippet: 'paddingBlockEnd: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingBlockEnd para um componente',
	},
	// paddingBlockStart
	{
		prefix: 'paddingBlockStart',
		snippet: 'paddingBlockStart: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingBlockStart para um componente',
	},
	// paddingBottom
	{
		prefix: 'paddingBottom',
		snippet: 'paddingBottom: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingBottom para um componente',
	},
	// paddingTop
	{
		prefix: 'paddingTop',
		snippet: 'paddingTop: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingTop para um componente',
	},
	// paddingHorizontal
	{
		prefix: 'paddingHorizontal',
		snippet: 'paddingHorizontal: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingHorizontal para um componente',
	},
	// paddingVertical
	{
		prefix: 'paddingVertical',
		snippet: 'paddingVertical: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo paddingVertical para um componente',
	},
	// right
	{
		prefix: 'right',
		snippet: 'right: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo right para um componente',
	},
	// start
	{
		prefix: 'start',
		snippet: 'start: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo start para um componente',
	},
	// top
	{
		prefix: 'top',
		snippet: 'top: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo top para um componente',
	},
	// width
	{
		prefix: 'width',
		snippet: 'width: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo width para um componente',
	},
	// zIndex
	{
		prefix: 'zIndex',
		snippet: 'zIndex: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo zIndex para um componente',
	},
	// flex
	{
		prefix: 'flex',
		snippet: 'flex: $1,',
		type: 'ReactNativeFlexStyle',
		description: 'Criar estilo flexível para um componente',
	},
	// shadowColor
	{
		prefix: 'shadowColor',
		snippet: "shadowColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo shadowColor para um componente',
	},
	// shadowOffset
	{
		prefix: 'shadowOffset',
		snippet: 'shadowOffset: { width: $1, height: $2 },',
		type: 'snippet Prop.',
		description: 'Adicionar estilo shadowOffset para um componente',
	},
	// shadowOpacity
	{
		prefix: 'shadowOpacity',
		snippet: 'shadowOpacity: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo shadowOpacity para um componente',
	},
	// shadowRadius
	{
		prefix: 'shadowRadius',
		snippet: 'shadowRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo shadowRadius para um componente',
	},
	// transform
	{
		prefix: 'transform',
		snippet: 'transform: [{ $1 }],',
		type: 'snippet Prop.',
		description: 'Adicionar estilo transform para um componente',
	},
	// backfaceVisibility
	{
		prefix: 'backfaceVisibility',
		snippet: "backfaceVisibility: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo backfaceVisibility para um componente',
	},
	// backgroundColor
	{
		prefix: 'backgroundColor',
		snippet: "backgroundColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo backgroundColor para um componente',
	},
	// borderBottomColor
	{
		prefix: 'borderBottomColor',
		snippet: "borderBottomColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomColor para um componente',
	},
	// borderBottomEndRadius
	{
		prefix: 'borderBottomEndRadius',
		snippet: 'borderBottomEndRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomEndRadius para um componente',
	},
	// borderBottomLeftRadius
	{
		prefix: 'borderBottomLeftRadius',
		snippet: 'borderBottomLeftRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomLeftRadius para um componente',
	},
	// borderBottomRightRadius
	{
		prefix: 'borderBottomRightRadius',
		snippet: 'borderBottomRightRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomRightRadius para um componente',
	},
	// borderBottomStartRadius
	{
		prefix: 'borderBottomStartRadius',
		snippet: 'borderBottomStartRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderBottomStartRadius para um componente',
	},
	// borderColor
	{
		prefix: 'borderColor',
		snippet: "borderColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderColor para um componente',
	},
	// borderCurve
	{
		prefix: 'borderCurve',
		snippet: "borderCurve: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderCurve para um componente',
	},
	// borderEndColor
	{
		prefix: 'borderEndColor',
		snippet: "borderEndColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderEndColor para um componente',
	},
	// borderEndEndRadius
	{
		prefix: 'borderEndEndRadius',
		snippet: 'borderEndEndRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderEndEndRadius para um componente',
	},
	// borderEndStartRadius
	{
		prefix: 'borderEndStartRadius',
		snippet: 'borderEndStartRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderEndStartRadius para um componente',
	},
	// borderLeftColor
	{
		prefix: 'borderLeftColor',
		snippet: "borderLeftColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderLeftColor para um componente',
	},
	// borderRadius
	{
		prefix: 'borderRadius',
		snippet: 'borderRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderRadius para um componente',
	},
	// borderRightColor
	{
		prefix: 'borderRightColor',
		snippet: "borderRightColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderRightColor para um componente',
	},
	// borderStartColor
	{
		prefix: 'borderStartColor',
		snippet: "borderStartColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderStartColor para um componente',
	},
	// borderStartEndRadius
	{
		prefix: 'borderStartEndRadius',
		snippet: 'borderStartEndRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderStartEndRadius para um componente',
	},
	// borderStartStartRadius
	{
		prefix: 'borderStartStartRadius',
		snippet: 'borderStartStartRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderStartStartRadius para um componente',
	},
	// borderStyle
	{
		prefix: 'boderStyle',
		snippet: "borderStyle: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderStyle para um componente',
	},
	// borderTopColor
	{
		prefix: 'borderTopColor',
		snippet: "borderTopColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopColor para um componente',
	},
	// borderTopEndRadius
	{
		prefix: 'borderTopEndRadius',
		snippet: 'borderTopEndRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopEndRadius para um componente',
	},
	// borderTopLeftRadius
	{
		prefix: 'borderTopLeftRadius',
		snippet: 'borderTopLeftRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopLeftRadius para um componente',
	},
	// borderTopRightRadius
	{
		prefix: 'borderTopRightRadius',
		snippet: 'borderTopRightRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopRightRadius para um componente',
	},
	// borderTopStartRadius
	{
		prefix: 'borderTopStartRadius',
		snippet: 'borderTopStartRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo borderTopStartRadius para um componente',
	},
	// elevation
	{
		prefix: 'elevation',
		snippet: 'elevation: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo elevation para um componente',
	},
	// opacity
	{
		prefix: 'opacity',
		snippet: 'opacity: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo opacity para um componente',
	},
	// pointerEvents
	{
		prefix: 'pointerEvents',
		snippet: "pointerEvents: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo pointerEvents para um componente',
	},
	// color
	{
		prefix: 'color',
		snippet: "color: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo color para um componente',
	},
	// fontFamily
	{
		prefix: 'fontFamily',
		snippet: "fontFamily: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo fontFamily para um componente',
	},
	// fontSize
	{
		prefix: 'fontSize',
		snippet: 'fontSize: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo fontSize para um componente',
	},
	// fontStyle
	{
		prefix: 'fontStyle',
		snippet: "fontStyle: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo fontStyle para um componente',
	},
	// fontVariant
	{
		prefix: 'fontVariant',
		snippet: "fontVariant: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo fontVariant para um componente',
	},
	// fontWeight
	{
		prefix: 'fontWeight',
		snippet: "fontWeight: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo fontWeight para um componente',
	},
	// includeFontPadding
	{
		prefix: 'includeFontPadding',
		snippet: 'includeFontPadding: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo includeFontPadding para um componente',
	},
	// letterSpacing
	{
		prefix: 'letterSpacing',
		snippet: 'letterSpacing: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo letterSpacing para um componente',
	},
	// lineHeight
	{
		prefix: 'lineHeight',
		snippet: 'lineHeight: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo lineHeight para um componente',
	},
	// textAlign
	{
		prefix: 'textAlign',
		snippet: "textAlign: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textAlign para um componente',
	},
	// textAlignVertical
	{
		prefix: 'textAlignVertical',
		snippet: "textAlignVertical: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textAlignVertical para um componente',
	},
	// textDecorationColor
	{
		prefix: 'textDecorationColor',
		snippet: "textDecorationColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textDecorationColor para um componente',
	},
	// textDecorationLine
	{
		prefix: 'textDecorationLine',
		snippet: "textDecorationLine: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textDecorationLine para um componente',
	},
	// textDecorationStyle
	{
		prefix: 'textDecorationStyle',
		snippet: "textDecorationStyle: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textDecorationStyle para um componente',
	},
	// textShadowColor
	{
		prefix: 'textShadowColor',
		snippet: "textShadowColor: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textShadowColor para um componente',
	},
	// textShadowOffset
	{
		prefix: 'textShadowOffset',
		snippet: 'textShadowOffset: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo textShadowOffset para um componente',
	},
	// textShadowRadius
	{
		prefix: 'textShadowRadius',
		snippet: 'textShadowRadius: $1,',
		type: 'snippet Prop.',
		description: 'Adicionar estilo textShadowRadius para um componente',
	},
	// textTransform
	{
		prefix: 'textTransform',
		snippet: "textTransform: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo textTransform para um componente',
	},
	// userSelect
	{
		prefix: 'userSelect',
		snippet: "userSelect: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo userSelect para um componente',
	},
	// verticalAlign
	{
		prefix: 'verticalAlign',
		snippet: "verticalAlign: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo verticalAlign para um componente',
	},
	// writingDirection
	{
		prefix: 'writingDirection',
		snippet: "writingDirection: '$1',",
		type: 'snippet Prop.',
		description: 'Adicionar estilo writingDirection para um componente',
	},
	// Snippets Express
	{
		prefix: 'exp-create-app',
		snippet: 'const app = express();',
		type: 'snippet Express',
		description: 'Criar uma instância do Express',
	},

	{
		prefix: 'exp-basic-route',
		snippet: 'app.get("/", (req, res) => {\n  res.send("Hello, World!");\n});',
		type: 'snippet Express',
		description: 'Definir uma rota básica',
	},

	{
		prefix: 'exp-param-route',
		snippet: 'app.get("/:id", (req, res) => {\n  const { id } = req.params;\n  res.send(`ID: ${id}`);\n});',
		type: 'snippet Express',
		description: 'Definir uma rota com parâmetros',
	},

	{
		prefix: 'exp-delete-route',
		snippet: "${1:router}.delete('/${2:path}', (req, res) => {\n  $3\n});",
		type: 'snippet Express',
		description: 'Definir rota DELETE no Express',
	},
];
