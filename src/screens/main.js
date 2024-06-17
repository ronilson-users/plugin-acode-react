import plugin from '../plugin.json';
import { diff_match_patch } from 'diff-match-patch';

const editor = editorManager.editor;
let session;

function handle(e) {
	session = editor.session;
	const c = session.getValue();
	const cp = editor.getCursorPosition();
	const mainRow = c.split('\n')[e.start.row];

	// Calcula e registra as diferenças entre o código anterior e o código atual
	const previousCode = c.substring(0, e.start.column) + e.lines.join('\n') + c.substring(e.end.column);
	const currentCode = session.getValue();
	const diffs = new diff_match_patch().diff_main(previousCode, currentCode);
	new diff_match_patch().diff_cleanupSemantic(diffs);

	// Faça algo com as diferenças, como enviar para um serviço de rastreamento de mudanças ou exibir ao usuário
	console.log('Diferenças de código:', diffs);
}

if (window.acode) {
	acode.setPluginInit(plugin.id, () => {
		editor.on('change', handle);
	});
	acode.setPluginUnmount(plugin.id, () => {
		editor.off('change', handle);
	});
}
