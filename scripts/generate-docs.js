#!/usr/bin/env node
import Sh from 'shelljs';
Sh.cmd( 'pnpm', 'extract-documentation-comments', '-I', 'src/*.js', '-O', 'docs' );
Sh.ls( 'docs/src/' ).forEach( ( basename ) => {
	Sh.mv( `docs/src/${basename}`, `docs/src/${basename.replace('.js','.md')}` );
} );
