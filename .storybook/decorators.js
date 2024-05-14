
import ProviderWrapper from "@/reduxcommon/provider-wrapper";
import configureStore from "@/reduxcommon/configureStore";

const { store } = configureStore({})

export const withProvider = (story) => (
    <ProviderWrapper store={store}>
        { story() }
    </ProviderWrapper>
)