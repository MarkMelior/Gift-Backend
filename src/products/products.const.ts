export const PRODUCT_NOT_FOUND_ERROR = 'Товар с таким ID не найден';

export const PRODUCT_DELETE_ERROR = 'Товар с таким ID не может быть удален';

export const PRODUCT_UPDATE_ERROR = 'Товар с таким ID не может быть обновлен';

export const FAVORITES_NOT_FOUND_ERROR = 'Избранные подарки не найдены';

export const PRODUCTS_CARD_DTO = {
	_id: 0,
	images: { $slice: ['$images', 5] },
	title: 1,
	markets: { $slice: ['$markets', 1] },
	article: 1,
};
