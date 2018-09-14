/** @format */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { Button, Dashicon, IconButton } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/editor';

export class ItemEditor extends Component {
	constructor() {
		super( ...arguments );
		this.toggleDone = this.toggleDone.bind( this );
		this.updateValue = this.updateValue.bind( this );
		this.onSetup = this.onSetup.bind( this );
		this.editor = undefined;
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.shouldFocus && ! prevProps.shouldFocus ) {
			window.requestAnimationFrame( () => {
				this.editor.focus();
			} );
		}
	}

	toggleDone() {
		const { item } = this.props;
		item.done = ! item.done;
		this.props.onChange( item );
	}

	updateValue( newValue ) {
		const { item } = this.props;
		item.value = newValue;
		this.props.onChange( item );
	}

	onSetup( editor ) {
		const { shouldFocus } = this.props;
		this.editor = editor;
		if ( shouldFocus ) {
			window.requestAnimationFrame( () => {
				this.editor.focus();
			} );
		}
	}

	render() {
		const { canMoveDown, canMoveUp, className, item, moveDown, moveUp, onDelete } = this.props;
		const { done, value } = item;
		return (
			<li
				className={ classnames( className, {
					[ `${ className }--done` ]: !! done,
				} ) }
			>
				<IconButton
					className={ `${ className }-status` }
					icon={ done ? 'yes' : undefined }
					onClick={ this.toggleDone }
				/>
				{ /* { 0 < item.level && <Button onClick={ moveLeft }>&lt;</Button> }
				{ 2 > item.level && <Button onClick={ moveRight }>&gt;</Button> }
				{ '-'.repeat( item.level ) }  */ }
				<span className={ `${ className }-title` }>
					<RichText
						tagName="div"
						value={ value }
						onChange={ this.updateValue }
						multiline={ false }
						onSplit={ this.props.onSplit }
						onSetup={ this.onSetup }
					/>
				</span>
				<span className="move-buttons">
					{ canMoveUp && (
						<Button onClick={ moveUp }>
							<Dashicon icon="arrow-up-alt2" />
						</Button>
					) }
					{ canMoveDown && (
						<Button onClick={ moveDown }>
							<Dashicon icon="arrow-down-alt2" />
						</Button>
					) }
					<Button onClick={ onDelete }>
						<Dashicon icon="no" />
					</Button>
				</span>
			</li>
		);
	}
}
