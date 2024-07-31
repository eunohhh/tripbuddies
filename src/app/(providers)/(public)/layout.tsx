import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type PublicLayoutProps = {
    children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const { pathname, queryParams } = getPathnameServer();

    return (
        <>
            {pathname === '/trips' && (
                <MobileHeader
                    title="모집중 여정"
                    notification
                    search
                    // settings
                    // edit
                    // close
                />
            )}
            {pathname === '/login' && (
                <MobileHeader
                // title="여정 작성"
                // notification
                // search
                // settings
                // edit
                // close
                />
            )}
            {pathname === '/signup' && (
                <MobileHeader
                // title="여정 작성"
                // notification
                // search
                // settings
                // edit
                // close
                />
            )}
            {pathname === '/search' && (
                <MobileHeader
                    title="검색"
                    // notification
                    // search
                    // settings
                    // edit
                    close
                />
            )}
            {children}
        </>
    );
};

export default PublicLayout;
