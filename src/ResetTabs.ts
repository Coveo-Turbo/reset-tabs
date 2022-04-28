import { Component, IComponentBindings, ComponentOptions, QueryEvents, IBuildingQueryEventArgs, IQuerySuccessEventArgs } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IResetTabsOptions {
    defaultTabId: string;
}

@lazyComponent
export class ResetTabs extends Component {
    static ID = 'ResetTabs';
    static options: IResetTabsOptions = {
        defaultTabId: ComponentOptions.buildStringOption({ defaultValue: 'All' }),
    };
    static previousQuery: string = null;

    constructor(public element: HTMLElement, public options: IResetTabsOptions, public bindings: IComponentBindings) {
        super(element, ResetTabs.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ResetTabs, options);
        this.bind.onRootElement(QueryEvents.buildingQuery, (args: IBuildingQueryEventArgs) => this.shouldResetTab(args));
        this.bind.onRootElement(QueryEvents.querySuccess, (args: IQuerySuccessEventArgs) => this.updateQuery(args));
    }

    private shouldResetTab(args: IBuildingQueryEventArgs) {
        const query = Coveo.state(this.element, "q");

        if (ResetTabs.previousQuery !== null && ResetTabs.previousQuery !== query) {
            Coveo.state(this.element, {
                "t": this.options.defaultTabId,
            })
        }
    }

    private updateQuery(args: IQuerySuccessEventArgs) {
        ResetTabs.previousQuery = Coveo.state(this.element, "q");
    }
}