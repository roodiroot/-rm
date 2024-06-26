import { StageDeal } from "@prisma/client";

import BackButton from "@/components/back-button";
import Container from "@/components/utils/container";
import HeaderForCRM from "@/components/utils/header-for-crm";
import { showOneDealById } from "@/actions/deal/show-one-deal";
import ContactsList from "@/components/page/company-page/contact-list";
import { StageBadge } from "@/components/page/company-page/stage-badge";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import ContactCreate from "@/components/page/company-page/contact-create";
import CommentCompany from "@/components/page/company-page/comment-company";
import CompanyCaseBlock from "@/components/page/company-page/company-case-block";
import FormError from "@/components/ui/form-error";

const AffairsDealPage = async ({
  params,
}: {
  params: { dealId: string; id: string };
}) => {
  const deal = await showOneDealById(params.dealId);
  const company = await showOneCompanyById(params.id);

  return (
    <Container>
      {deal ? (
        <>
          <div className="flex items-center gap-4 lg:col-span-3">
            <BackButton />
            <HeaderForCRM text={deal?.name} />
            <StageBadge
              stage={deal?.stage || StageDeal.NEW}
              className=" inline-flex"
            />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 order-2 lg:order-1">
            <CompanyCaseBlock
              companyName={company?.name}
              dealId={deal?.id}
              dealCase={deal?.cases}
              stage={deal?.stage}
            />
          </div>
          <div className=" grid gap-4 order-1 lg:order-2 lg:sticky lg:top-0">
            <CommentCompany
              companyId={company?.id}
              companyName={company?.name}
              comment={company?.comment}
            />
            <ContactsList contacts={company?.contacts} />
            <ContactCreate companyId={company?.id} />
          </div>
        </>
      ) : (
        <FormError message="Не достаточно прав на просмотр данного ресурса" />
      )}
    </Container>
  );
};

export default AffairsDealPage;
