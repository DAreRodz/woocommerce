/**
 * External dependencies
 */
import classNames from 'classnames';
import { Slot } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useWooBlockProps } from '@woocommerce/block-templates';
import { __experimentalTooltip as Tooltip } from '@woocommerce/components';
import {
	// @ts-expect-error no exported member.
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../../utils/sanitize-html';
import { SectionBlockAttributes } from './types';
import { ProductEditorBlockEditProps } from '../../../types';

export function SectionBlockEdit( {
	attributes,
	clientId,
}: ProductEditorBlockEditProps< SectionBlockAttributes > ) {
	const { description, title, blockGap } = attributes;

	const blockProps = useWooBlockProps( attributes );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: classNames(
				'wp-block-woocommerce-product-section__content',
				`wp-block-woocommerce-product-section__content--block-gap-${ blockGap }`
			),
		},
		{ templateLock: 'all' }
	);
	const SectionTagName = title ? 'fieldset' : 'div';
	const HeadingTagName = SectionTagName === 'fieldset' ? 'legend' : 'div';
	const tooltipClassName = `wp-block-woocommerce-product-section__heading-tooltip-${ clientId }`;

	return (
		<SectionTagName { ...blockProps }>
			{ title && (
				<HeadingTagName className="wp-block-woocommerce-product-section__heading">
					<h2 className="wp-block-woocommerce-product-section__heading-title">
						{ title }
						{ description && (
							<Tooltip
								className={ tooltipClassName }
								text={
									<p
										className="wp-block-woocommerce-product-section__heading-description"
										dangerouslySetInnerHTML={ sanitizeHTML(
											description
										) }
									/>
								}
								position={ 'bottom center' }
								helperText={ __(
									'View helper text',
									'woocommerce'
								) }
							/>
						) }
					</h2>

					<Slot name={ clientId } />
				</HeadingTagName>
			) }

			<div { ...innerBlockProps } />
		</SectionTagName>
	);
}
