import { createReducer } from '@/redux/root';
import {
  promotionNameSpace,
  requestPromotionsAsync,
  updatePromotionAsync,
  createPromotionAsync,
  removePromotionAsync,
  requestPromotionTypesAsync,
} from './';
import { NAME } from './selectors';
import { formatDate } from '@/lib/utils';

const toOptions = (arr) =>
  arr.map(({ code, id }) => ({
    label: code,
    value: id,
  }));

const isActive = (promotion) => {
  const isDisabled = promotion.disabled_at;

  const currentDate = new Date();
  const startOnDate = new Date(promotion.start_on);

  const activeDate = currentDate >= startOnDate;

  return !isDisabled && activeDate;
};

const isReferral = (promotion) => {
  return promotion.is_customer_referral || promotion.is_employee_referral;
};

const Promotions = (newPromotions) => {
  const promotionsMap = new Map();
  const promotions = newPromotions.map((promotion) => {
    const newPromotion = {
      ...promotion,
      isReferral: isReferral(promotion),
      isActive: isActive(promotion),
      start_on: formatDate(promotion.start_on) ?? null,
      end_on: formatDate(promotion.end_on) ?? null,
      initial_discount_value: promotion.initial_discount_value / 100,
      max_discount_value: promotion.max_discount_value / 100,
      recurring_discount_value: promotion.recurring_discount_value / 100,
      referral_value: promotion.referral_value / 100,
    };

    promotionsMap.set(newPromotion.id, newPromotion);

    return newPromotion;
  });

  const activePromotions = promotions.filter(({ isActive }) => isActive);

  return {
    get: (id) => promotionsMap.get(id),
    promotions,
    referralOptions: toOptions(
      activePromotions.filter(({ isReferral }) => isReferral)
    ),
    promoOptions: toOptions(
      activePromotions.filter(({ isReferral }) => !isReferral)
    ),
    create: (promotion) => Promotions([...promotions, promotion]),
    remove: (promotionId) =>
      Promotions(promotions.filter(({ id }) => id !== promotionId)),
    update: (promotion) =>
      Promotions(
        promotions.map((pp) => (pp.id == promotion.id ? promotion : pp))
      ),
  };
};

const promotionsInitialState = {
  promotions: Promotions([]),
  types: [],
};

export const promotionsReducer = {
  [NAME]: createReducer(promotionNameSpace, promotionsInitialState, {
    [requestPromotionsAsync.success]: ({ state, action: { payload } }) => {
      state.promotions = Promotions(payload);
    },

    [requestPromotionTypesAsync.success]: ({ state, action: { payload } }) => {
      state.types = payload;
    },

    [updatePromotionAsync.success]: ({ state, action: { payload } }) => {
      state.promotions = state.promotions.update(payload);
    },

    [createPromotionAsync.success]: ({ state, action: { payload } }) => {
      state.promotions = state.promotions.create(payload);
    },

    [removePromotionAsync.success]: ({ state, action: { payload } }) => {
      state.promotions = state.promotions.remove(payload);
    },
  }),
};
