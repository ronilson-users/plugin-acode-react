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
		description: 'Import from React Native',
	},

	{
		prefix: 'imc-import-components',
		snippet: `import { View, Text, StyleSheet } from 'react-native'`,
		type: 'snippet RN',
		description: 'Import View, Text, StyleSheet from React Native',
	},
	{
		prefix: 'im-import-state-effect',
		snippet: "import { useState, useEffect } from 'react-native';",
		type: 'snippet RN',
		description: 'Import useState in useEffect do react-native',
	},

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
		description: 'Export default function with fragment return in React Native',
	},

	{
		prefix: 'rn-export-default',
		snippet: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App$1() {
  const styles = StyleSheet.create({
    container: {
      // Add styles here
    },
  });

  return (
    <View style={styles.container}>
      {/* Add View content here */}
    </View>
  );
}`,
		type: 'snippet RN',
		description: 'Export default App function with styles in React Native',
	},

	{
		prefix: 'rn-functional-component',
		snippet: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const $1 = () => {
  return (
    <View style={styles.container}>
      <Text>Your Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add container styles here
  },
});

export default $1;`,
		type: 'snippet RN',
		description: 'Snippet for a functional component in React Native',
	},

	{
		prefix: 'rn-constant',
		snippet: 'const $1 = $2',
		type: 'snippet RN',
		description: 'Create a constant in React Native',
	},


	{
		prefix: 'rn-class-component',
		snippet: `import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class $1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Your Text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // Add container styles here
  },
});

export default $1;`,
		type: 'snippet RN',
		description: 'Snippet for a class component in React Native',
	},

	{
		prefix: 'rn-flatlist',
		snippet: `import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const data = [
  { key: 'Item 1' },
  { key: 'Item 2' },
  { key: 'Item 3' },
];

const $1 = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.key}</Text>
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default $1;`,
		type: 'snippet RN',
		description: 'Snippet for a FlatList component in React Native',
	},

	{
		prefix: 'rn-basic-styles',
		snippet: `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default styles;`,
		type: 'snippet RN',
		description: 'Basic styles for a React Native component',
	},

	{
		prefix: 'rn-usestate',
		snippet: `import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const $1 = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default $1;`,
		type: 'snippet RN',
		description: 'Snippet for using useState in a functional component',
	},
	
	{
	prefix: 'rn-usestate-hook',
	snippet: 'const [$1, set$2] = useState($3);',
	type: 'snippet RN',
	description: 'Create a snippet for the useState hook',
},

{
	prefix: 'rn-useeffect-hook',
	snippet: 'useEffect(() => { $1 \n \n }, [$2]);',
	type: 'snippet RN',
	description: 'Create a snippet for the useEffect hook',
},

// React Native Style Snippet
{
	prefix: 'style',
	snippet: 'style={styles.$1}',
	type: 'snippet RN',
	description: 'Add React Native style using StyleSheet',
},

{
	prefix: 'rn-custom-styles',
	snippet: `const styles = StyleSheet.create({
  $1: {
    // Your custom styles here
  },
});`,
	type: 'snippet RN',
	description: 'Add a snippet for custom styles',
},

// Asynchronous Requests
{
	prefix: 'fetch-request',
	snippet: `fetch('$1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`,
	type: 'snippet RN',
	description: 'Create a snippet for making a request using fetch',
},

// Lifecycle Methods
{
	prefix: 'rn-componentdidmount',
	snippet: 'componentDidMount() { $1 }',
	type: 'snippet RN',
	description: 'Add a snippet for componentDidMount',
},

// Tests
{
	prefix: 'rn-test-case',
	snippet: `test('$1', () => {
  // Your test logic here
});`,
	type: 'snippet RN',
	description: 'Create a snippet for a basic test structure',
},

/*
  logs
*/

// Simple log
{
	prefix: 'clg',
	snippet: 'console.log($1);',
	type: 'snippet log',
	description: 'Simple console log',
},
// Formatted string log
{
	prefix: 'clg-f',
	snippet: 'console.log(`$1:`, $1);',
	type: 'log',
	description: 'Formatted string console log',
},
// Object log
{
	prefix: 'clg-o',
	snippet: "console.log('$1', $1);",
	type: 'snippet log',
	description: 'Object console log',
},
// Error log
{
	prefix: 'clg-e',
	snippet: 'console.error($1);',
	type: 'log',
	description: 'Error console log',
},
// Warning log
{
	prefix: 'clg-w',
	snippet: 'console.warn($1);',
	type: 'snippet log',
	description: 'Warning console log',
},
// Info log
{
	prefix: 'clg-i',
	snippet: 'console.info($1);',
	type: 'log',
	description: 'Info console log',
},
// Time log
{
	prefix: 'clg-t',
	snippet: "console.time('$1');\n$2\nconsole.timeEnd('$1');",
	type: 'snippet log',
	description: 'Time console log',
},

// Table log for array of objects
{
	prefix: 'clg-tb',
	snippet: 'console.table($1);',
	type: 'snippet log',
	description: 'Table console log for array of objects',
},


// JavaScript
{
	prefix: 'obj-properties',
	snippet: `const $1 = {
  name: 'String',
  age: 0,
};`,
	type: 'snippet',
	description: 'Create a JavaScript object with default properties',
},

{
	prefix: 'arrow-function',
	snippet: 'const $1 = ($2) => {\n  $3\n};',
	type: 'snippet RN',
	description: 'Create an arrow function with parameters',
},

{
	prefix: 'map-function',
	snippet: 'const ${1:transformedArray} = ${2:array}.map((${3:item}) => {\n  $4\n});',
	type: 'snippet RN',
	description: 'Create a map function in JavaScript',
},

{
	prefix: 'const-persona',
	snippet: "const ${1:Persona} = {\n  name: 'String',\n  age: 0,\n};",
	type: 'snippet RN',
	description: 'Snippet to create an object in JavaScript',
},

{
	prefix: 'ternary-operator',
	snippet: 'const $1 = $2 ? $3 : $4;',
	type: 'snippet RN',
	description: 'Create a ternary operator in JavaScript',
},

{
	prefix: 'try-catch-block',
	snippet: 'try {\n  $1\n} catch (error) {\n  $2\n}',
	type: 'snippet RN',
	description: 'Create a try-catch block in JavaScript',
},
	// Hooks
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
		description: 'Creat snippetfrom  component personalized',
	},
	// ReactNativeStyleSnippet
	{
		prefix: 'style',
		snippet: 'style={styles.$1}',
		type: 'snippet RN',
		description: 'Add style in React Native  StyleSheet',
	},

	
	

	// Lifecycle Methods
	{
		prefix: 'rn-componentdidmount',
		snippet: 'componentDidMount() { $1 }',
		type: 'snippet RN',
		description: 'Add in snippet for componentDidMount',
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
	description: 'Create TouchableOpacity in React Native',
},
// SafeAreaView
{
	prefix: 'SafeAreaView',
	snippet: '<SafeAreaView style={$1}>\n  $2\n</SafeAreaView>',
	type: 'snippet RN',
	description: 'Create SafeAreaView in React Native',
},
// FlatList
{
	prefix: 'FlatList',
	snippet: `<FlatList
  data={$1}
  renderItem={({ item }) => ($2)}
  keyExtractor={(item) => item.id.toString()}
/>`,
	type: 'snippet RN',
	description: 'Create FlatList in React Native',
},
// ScrollView
{
	prefix: 'ScrollView',
	snippet: '<ScrollView style={$1}>\n  $2\n</ScrollView>',
	type: 'snippet RN',
	description: 'Create ScrollView in React Native',
},
// TextInput
{
	prefix: 'TextInput',
	snippet: `<TextInput
  style={$1}
  onChangeText={(text) => $2}
  value={$3}
/>`,
	type: 'snippet RN',
	description: 'Create TextInput in React Native',
},
// Pressable
{
	prefix: 'Pressable',
	snippet: '<Pressable onPress={$1}>\n  $2\n</Pressable>',
	type: 'snippet RN',
	description: 'Create Pressable in React Native',
},
// View
{
	prefix: 'View',
	snippet: '<View $1>\n  $2\n</View>',
	type: 'snippet RN',
	description: 'Create View in React Native',
},

/* 
  Criar Style para StyleSheet RN
*/

// alignContent
{
	prefix: 'alignContent',
	snippet: "alignContent: '$1',",
	type: 'snippet Prop.',
	description: 'Add alignContent style to a component',
},
// alignItems
{
	prefix: 'alignItems',
	snippet: "alignItems: '$1',",
	type: 'snippet Prop.',
	description: 'Add alignItems style to a component',
},
// alignSelf
{
	prefix: 'alignSelf',
	snippet: "alignSelf: '$1',",
	type: 'snippet Prop.',
	description: 'Add alignSelf style to a component',
},
// aspectRatio - number
{
	prefix: 'aspectRatio',
	snippet: "aspectRatio: $1,",
	type: 'snippet Prop.',
	description: 'Add aspectRatio style (number) to a component',
},
// borderBottomWidth - number
{
	prefix: 'borderBottomWidth',
	snippet: "borderBottomWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderBottomWidth style (number) to a component',
},
// borderLeftWidth - number
{
	prefix: 'borderLeftWidth',
	snippet: "borderLeftWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderLeftWidth style (number) to a component',
},
// borderRightWidth - number
{
	prefix: 'borderRightWidth',
	snippet: "borderRightWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderRightWidth style (number) to a component',
},
// borderStartWidth - number
{
	prefix: 'borderStartWidth',
	snippet: "borderStartWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderStartWidth style (number) to a component',
},
// borderTopWidth - number
{
	prefix: 'borderTopWidth',
	snippet: "borderTopWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderTopWidth style (number) to a component',
},
// borderWidth - number
{
	prefix: 'borderWidth',
	snippet: "borderWidth: $1,",
	type: 'snippet Prop.',
	description: 'Add borderWidth style (number) to a component',
},

// borderEndWidth - number
{
	prefix: 'borderEndWidth',
	snippet: 'borderEndWidth: $1,',
	type: 'snippet Prop.',
	description: 'Add borderEndWidth style (number) to a component',
},
// Bottom - number
{
	prefix: 'bottom',
	snippet: 'bottom: $1,',
	type: 'snippet Prop.',
	description: 'Add bottom style (number) to a component',
},
// Column Gap - number
{
	prefix: 'columnGap',
	snippet: 'columnGap: $1,',
	type: 'snippet Prop.',
	description: 'Add columnGap style (number) to a component',
},
// Direction
{
	prefix: 'direction',
	snippet: "direction: '$1',",
	type: 'snippet Prop.',
	description: 'Add direction style to a component',
},
// Display
{
	prefix: 'display',
	snippet: "display: '$1',",
	type: 'snippet Prop.',
	description: 'Add display style to a component',
},
// End - number
{
	prefix: 'end',
	snippet: 'end: $1,',
	type: 'snippet Prop.',
	description: 'Add end style (number) to a component',
},
// Flex - number
{
	prefix: 'flex',
	snippet: 'flex: $1,',
	type: 'snippet Prop.',
	description: 'Add flex style (number) to a component',
},
// Flex Basis - number
{
	prefix: 'flexBasis',
	snippet: 'flexBasis: $1,',
	type: 'snippet Prop.',
	description: 'Add flexBasis style (number) to a component',
},
// Flex Direction
{
	prefix: 'flexDirection',
	snippet: "flexDirection: '$1',",
	type: 'snippet Prop.',
	description: 'Add flexDirection style to a component',
	  body: [
                    "flexDirection: '${1:row}',",
                    "flexDirection: '${2:row-reverse}',",
                    "flexDirection: '${3:column}',",
                    "flexDirection: '${4:column-reverse}',",
                ],
                score : 750,
},

// Flex Grow - number
{
	prefix: 'flexGrow',
	snippet: 'flexGrow: $1,',
	type: 'snippet Prop.',
	description: 'Add flexGrow style (number) to a component',
},
// Flex Shrink - number
{
	prefix: 'flexShrink',
	snippet: 'flexShrink: $1,',
	type: 'snippet Prop.',
	description: 'Add flexShrink style (number) to a component',
},
// Flex Wrap
{
	prefix: 'flexWrap',
	snippet: "flexWrap: '$1',",
	type: 'snippet Prop.',
	description: 'Add flexWrap style to a component',
},
// Gap - number
{
	prefix: 'gap',
	snippet: 'gap: $1,',
	type: 'snippet Prop.',
	description: 'Add gap style (number) to a component',
},
// Height - number
{
	prefix: 'height',
	snippet: 'height: $1,',
	type: 'snippet Prop.',
	description: 'Add height style (number) to a component',
},
// Inset - number
{
	prefix: 'inset',
	snippet: 'inset: $1,',
	type: 'snippet Prop.',
	description: 'Add inset style (number) to a component',
},
// Inset Block End - number
{
	prefix: 'insetBlockEnd',
	snippet: 'insetBlockEnd: $1,',
	type: 'snippet Prop.',
	description: 'Add insetBlockEnd style (number) to a component',
},
// Inset Block Start - number
{
	prefix: 'insetBlockStart',
	snippet: 'insetBlockStart: $1,',
	type: 'snippet Prop.',
	description: 'Add insetBlockStart style (number) to a component',
},
// Inset Inline - number
{
	prefix: 'insetInline',
	snippet: 'insetInline: $1,',
	type: 'snippet Prop.',
	description: 'Add insetInline style (number) to a component',
},
// Inset Inline End - number
{
	prefix: 'insetInlineEnd',
	snippet: 'insetInlineEnd: $1,',
	type: 'snippet Prop.',
	description: 'Add insetInlineEnd style (number) to a component',
},
// Inset Inline Start - number
{
	prefix: 'insetInlineStart',
	snippet: 'insetInlineStart: $1,',
	type: 'snippet Prop.',
	description: 'Add insetInlineStart style (number) to a component',
},
	
	// justifyContent
{
    prefix: 'justifyContent',
    snippet: "justifyContent: '$1',",
    type: 'snippet Prop.',
    description: 'Add justifyContent style to a component',
},
// left
{
    prefix: 'left',
    snippet: 'left: $1,',
    type: 'snippet Prop.',
    description: 'Add left style to a component',
},
// margin
{
    prefix: 'margin',
    snippet: 'margin: $1,',
    type: 'snippet Prop.',
    description: 'Add margin style to a component',
},
// marginBlock
{
    prefix: 'marginBlock',
    snippet: 'marginBlock: $1,',
    type: 'snippet Prop.',
    description: 'Add marginBlock style to a component',
},
// marginBlockEnd
{
    prefix: 'marginBlockEnd',
    snippet: 'marginBlockEnd: $1,',
    type: 'snippet Prop.',
    description: 'Add marginBlockEnd style to a component',
},
// marginBlockStart
{
    prefix: 'marginBlockStart',
    snippet: 'marginBlockStart: $1,',
    type: 'snippet Prop.',
    description: 'Add marginBlockStart style to a component',
},
// marginBottom
{
    prefix: 'marginBottom',
    snippet: 'marginBottom: $1,',
    type: 'snippet Prop.',
    description: 'Add marginBottom style to a component',
},
// marginEnd
{
    prefix: 'marginEnd',
    snippet: 'marginEnd: $1,',
    type: 'snippet Prop.',
    description: 'Add marginEnd style to a component',
},
// marginHorizontal
{
    prefix: 'marginHorizontal',
    snippet: 'marginHorizontal: $1,',
    type: 'snippet Prop.',
    description: 'Add marginHorizontal style to a component',
},
// marginInline
{
    prefix: 'marginInline',
    snippet: 'marginInline: $1,',
    type: 'snippet Prop.',
    description: 'Add marginInline style to a component',
},
// marginInlineEnd
{
    prefix: 'marginInlineEnd',
    snippet: 'marginInlineEnd: $1,',
    type: 'snippet Prop.',
    description: 'Add marginInlineEnd style to a component',
},
// marginInlineStart
{
    prefix: 'marginInlineStart',
    snippet: 'marginInlineStart: $1,',
    type: 'snippet Prop.',
    description: 'Add marginInlineStart style to a component',
},
// marginLeft
{
    prefix: 'marginLeft',
    snippet: 'marginLeft: $1,',
    type: 'snippet Prop.',
    description: 'Add marginLeft style to a component',
},
// marginRight
{
    prefix: 'marginRight',
    snippet: 'marginRight: $1,',
    type: 'snippet Prop.',
    description: 'Add marginRight style to a component',
},
// marginStart
{
    prefix: 'marginStart',
    snippet: 'marginStart: $1,',
    type: 'snippet Prop.',
    description: 'Add marginStart style to a component',
},
// marginTop
{
    prefix: 'marginTop',
    snippet: 'marginTop: $1,',
    type: 'snippet Prop.',
    description: 'Add marginTop style to a component',
},
// marginVertical
{
    prefix: 'marginVertical',
    snippet: 'marginVertical: $1,',
    type: 'snippet Prop.',
    description: 'Add marginVertical style to a component',
},
// maxHeight
{
    prefix: 'maxHeight',
    snippet: 'maxHeight: $1,',
    type: 'snippet Prop.',
    description: 'Add maxHeight style to a component',
},
// maxWidth
{
    prefix: 'maxWidth',
    snippet: 'maxWidth: $1,',
    type: 'snippet Prop.',
    description: 'Add maxWidth style to a component',
},
// minHeight
{
    prefix: 'minHeight',
    snippet: 'minHeight: $1,',
    type: 'snippet Prop.',
    description: 'Add minHeight style to a component',
},
// minWidth
{
    prefix: 'minWidth',
    snippet: 'minWidth: $1,',
    type: 'snippet Prop.',
    description: 'Add minWidth style to a component',
},
	
	// Overflow
{
    prefix: 'overflow',
    snippet: "overflow: '$1',",
    type: 'snippet Prop.',
    description: 'Add overflow style to a component',
},
// paddingBlock
{
    prefix: 'paddingBlock',
    snippet: 'paddingBlock: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingBlock style to a component',
},
// paddingBlockEnd
{
    prefix: 'paddingBlockEnd',
    snippet: 'paddingBlockEnd: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingBlockEnd style to a component',
},
// paddingBlockStart
{
    prefix: 'paddingBlockStart',
    snippet: 'paddingBlockStart: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingBlockStart style to a component',
},
// paddingBottom
{
    prefix: 'paddingBottom',
    snippet: 'paddingBottom: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingBottom style to a component',
},
// paddingTop
{
    prefix: 'paddingTop',
    snippet: 'paddingTop: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingTop style to a component',
},
// paddingHorizontal
{
    prefix: 'paddingHorizontal',
    snippet: 'paddingHorizontal: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingHorizontal style to a component',
},
// paddingVertical
{
    prefix: 'paddingVertical',
    snippet: 'paddingVertical: $1,',
    type: 'snippet Prop.',
    description: 'Add paddingVertical style to a component',
},
// right
{
    prefix: 'right',
    snippet: 'right: $1,',
    type: 'snippet Prop.',
    description: 'Add right style to a component',
},
// start
{
    prefix: 'start',
    snippet: 'start: $1,',
    type: 'snippet Prop.',
    description: 'Add start style to a component',
},
// top
{
    prefix: 'top',
    snippet: 'top: $1,',
    type: 'snippet Prop.',
    description: 'Add top style to a component',
},
// width
{
    prefix: 'width',
    snippet: 'width: $1,',
    type: 'snippet Prop.',
    description: 'Add width style to a component',
},
// zIndex
{
    prefix: 'zIndex',
    snippet: 'zIndex: $1,',
    type: 'snippet Prop.',
    description: 'Add zIndex style to a component',
},
// flex
{
    prefix: 'flex',
    snippet: 'flex: $1,',
    type: 'ReactNativeFlexStyle',
    description: 'Create flexible style for a component',
},
// shadowColor
{
    prefix: 'shadowColor',
    snippet: "shadowColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add shadowColor style to a component',
},
// shadowOffset
{
    prefix: 'shadowOffset',
    snippet: 'shadowOffset: { width: $1, height: $2 },',
    type: 'snippet Prop.',
    description: 'Add shadowOffset style to a component',
},
// shadowOpacity
{
    prefix: 'shadowOpacity',
    snippet: 'shadowOpacity: $1,',
    type: 'snippet Prop.',
    description: 'Add shadowOpacity style to a component',
},
// shadowRadius
{
    prefix: 'shadowRadius',
    snippet: 'shadowRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add shadowRadius style to a component',
},
// transform
{
    prefix: 'transform',
    snippet: 'transform: [{ $1 }],',
    type: 'snippet Prop.',
    description: 'Add transform style to a component',
},
// backfaceVisibility
{
    prefix: 'backfaceVisibility',
    snippet: "backfaceVisibility: '$1',",
    type: 'snippet Prop.',
    description: 'Add backfaceVisibility style to a component',
},
// backgroundColor
{
    prefix: 'backgroundColor',
    snippet: "backgroundColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add backgroundColor style to a component',
},

	// borderBottomColor
{
    prefix: 'borderBottomColor',
    snippet: "borderBottomColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderBottomColor style to a component',
},
// borderBottomEndRadius
{
    prefix: 'borderBottomEndRadius',
    snippet: 'borderBottomEndRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderBottomEndRadius style to a component',
},
// borderBottomLeftRadius
{
    prefix: 'borderBottomLeftRadius',
    snippet: 'borderBottomLeftRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderBottomLeftRadius style to a component',
},
// borderBottomRightRadius
{
    prefix: 'borderBottomRightRadius',
    snippet: 'borderBottomRightRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderBottomRightRadius style to a component',
},
// borderBottomStartRadius
{
    prefix: 'borderBottomStartRadius',
    snippet: 'borderBottomStartRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderBottomStartRadius style to a component',
},
// borderColor
{
    prefix: 'borderColor',
    snippet: "borderColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderColor style to a component',
},
// borderCurve
{
    prefix: 'borderCurve',
    snippet: "borderCurve: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderCurve style to a component',
},
// borderEndColor
{
    prefix: 'borderEndColor',
    snippet: "borderEndColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderEndColor style to a component',
},
// borderEndEndRadius
{
    prefix: 'borderEndEndRadius',
    snippet: 'borderEndEndRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderEndEndRadius style to a component',
},
// borderEndStartRadius
{
    prefix: 'borderEndStartRadius',
    snippet: 'borderEndStartRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderEndStartRadius style to a component',
},
// borderLeftColor
{
    prefix: 'borderLeftColor',
    snippet: "borderLeftColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderLeftColor style to a component',
},
// borderRadius
{
    prefix: 'borderRadius',
    snippet: 'borderRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderRadius style to a component',
},
// borderRightColor
{
    prefix: 'borderRightColor',
    snippet: "borderRightColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderRightColor style to a component',
},
// borderStartColor
{
    prefix: 'borderStartColor',
    snippet: "borderStartColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderStartColor style to a component',
},
// borderStartEndRadius
{
    prefix: 'borderStartEndRadius',
    snippet: 'borderStartEndRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderStartEndRadius style to a component',
},
// borderStartStartRadius
{
    prefix: 'borderStartStartRadius',
    snippet: 'borderStartStartRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderStartStartRadius style to a component',
},
// borderStyle
{
    prefix: 'borderStyle',
    snippet: "borderStyle: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderStyle style to a component',
},
// borderTopColor
{
    prefix: 'borderTopColor',
    snippet: "borderTopColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add borderTopColor style to a component',
},
// borderTopEndRadius
{
    prefix: 'borderTopEndRadius',
    snippet: 'borderTopEndRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderTopEndRadius style to a component',
},
// borderTopLeftRadius
{
    prefix: 'borderTopLeftRadius',
    snippet: 'borderTopLeftRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderTopLeftRadius style to a component',
},
// borderTopRightRadius
{
    prefix: 'borderTopRightRadius',
    snippet: 'borderTopRightRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderTopRightRadius style to a component',
},
// borderTopStartRadius
{
    prefix: 'borderTopStartRadius',
    snippet: 'borderTopStartRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add borderTopStartRadius style to a component',
},
// elevation
{
    prefix: 'elevation',
    snippet: 'elevation: $1,',
    type: 'snippet Prop.',
    description: 'Add elevation style to a component',
},
// opacity
{
    prefix: 'opacity',
    snippet: 'opacity: $1,',
    type: 'snippet Prop.',
    description: 'Add opacity style to a component',
},
// pointerEvents
{
    prefix: 'pointerEvents',
    snippet: "pointerEvents: '$1',",
    type: 'snippet Prop.',
    description: 'Add pointerEvents style to a component',
},
// color
{
    prefix: 'color',
    snippet: "color: '$1',",
    type: 'snippet Prop.',
    description: 'Add color style to a component',
},
// fontFamily
{
    prefix: 'fontFamily',
    snippet: "fontFamily: '$1',",
    type: 'snippet Prop.',
    description: 'Add fontFamily style to a component',
},
// fontSize
{
    prefix: 'fontSize',
    snippet: 'fontSize: $1,',
    type: 'snippet Prop.',
    description: 'Add fontSize style to a component',
},
// fontStyle
{
    prefix: 'fontStyle',
    snippet: "fontStyle: '$1',",
    type: 'snippet Prop.',
    description: 'Add fontStyle style to a component',
},
// fontVariant
{
    prefix: 'fontVariant',
    snippet: "fontVariant: '$1',",
    type: 'snippet Prop.',
    description: 'Add fontVariant style to a component',
},
// fontWeight
{
    prefix: 'fontWeight',
    snippet: "fontWeight: '$1',",
    type: 'snippet Prop.',
    description: 'Add fontWeight style to a component',
},
// includeFontPadding
{
    prefix: 'includeFontPadding',
    snippet: 'includeFontPadding: $1,',
    type: 'snippet Prop.',
    description: 'Add includeFontPadding style to a component',
},
// letterSpacing
{
    prefix: 'letterSpacing',
    snippet: 'letterSpacing: $1,',
    type: 'snippet Prop.',
    description: 'Add letterSpacing style to a component',
},
// lineHeight
{
    prefix: 'lineHeight',
    snippet: 'lineHeight: $1,',
    type: 'snippet Prop.',
    description: 'Add lineHeight style to a component',
},
// textAlign
{
    prefix: 'textAlign',
    snippet: "textAlign: '$1',",
    type: 'snippet Prop.',
    description: 'Add textAlign style to a component',
},
// textAlignVertical
{
    prefix: 'textAlignVertical',
    snippet: "textAlignVertical: '$1',",
    type: 'snippet Prop.',
    description: 'Add textAlignVertical style to a component',
},
// textDecorationColor
{
    prefix: 'textDecorationColor',
    snippet: "textDecorationColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add textDecorationColor style to a component',
},
// textDecorationLine
{
    prefix: 'textDecorationLine',
    snippet: "textDecorationLine: '$1',",
    type: 'snippet Prop.',
    description: 'Add textDecorationLine style to a component',
},
// textDecorationStyle
{
    prefix: 'textDecorationStyle',
    snippet: "textDecorationStyle: '$1',",
    type: 'snippet Prop.',
    description: 'Add textDecorationStyle style to a component',
},
// textShadowColor
{
    prefix: 'textShadowColor',
    snippet: "textShadowColor: '$1',",
    type: 'snippet Prop.',
    description: 'Add textShadowColor style to a component',
},
// textShadowOffset
{
    prefix: 'textShadowOffset',
    snippet: 'textShadowOffset: $1,',
    type: 'snippet Prop.',
    description: 'Add textShadowOffset style to a component',
},
// textShadowRadius
{
    prefix: 'textShadowRadius',
    snippet: 'textShadowRadius: $1,',
    type: 'snippet Prop.',
    description: 'Add textShadowRadius style to a component',
},
// textTransform
{
    prefix: 'textTransform',
    snippet: "textTransform: '$1',",
    type: 'snippet Prop.',
    description: 'Add textTransform style to a component',
},
// userSelect
{
    prefix: 'userSelect',
    snippet: "userSelect: '$1',",
    type: 'snippet Prop.',
    description: 'Add userSelect style to a component',
},
// verticalAlign
{
    prefix: 'verticalAlign',
    snippet: "verticalAlign: '$1',",
    type: 'snippet Prop.',
    description: 'Add verticalAlign style to a component',
},
// writingDirection

    
{
    prefix: 'writingDirection',
    snippet: "writingDirection: '$1',",
    type: 'snippet Prop.',
    description: 'Add writingDirection style to a component',
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
    // Adicione outros snippets conforme necessário
    
    ]